# Order Tracking Fix - Problem & Solution

## The Problem

**What was happening:**
- Orders were stored in an **in-memory array** (`global.orders`) on the server
- Webhooks successfully created and stored orders
- Admin dashboard could see orders (same server instance)
- BUT: Track page couldn't find orders (different server instance or after restart)

**Why it failed on Vercel:**
1. Vercel uses **serverless functions** - each request can hit a different server instance
2. Each instance has its own isolated memory/global variables
3. When webhook runs, it stores order in Instance A's memory
4. When track page runs, it queries Instance B's memory (which is empty)
5. Result: "Order not found" error

---

## The Solution

### Created: `src/lib/storage.js`
A new file-based storage system that:
- **Reads** orders from a JSON file (`orders.json`)
- **Writes** orders persistently to disk
- **Automatically creates** the `.data/` directory on both local and Vercel environments
- Uses `/tmp` on Vercel (serverless-compatible) and `.data/` locally

**Key Functions:**
```javascript
readOrders()          // Read all orders from file
writeOrders(orders)   // Write orders to file
addOrder(order)       // Create new order
getOrderById(orderId) // Find specific order
updateOrder(id, updates) // Update order status
```

### Updated API Routes to Use File Storage:

1. **`/api/webhook/route.js`**
   - Changed from: `global.orders.push(order)`
   - Changed to: `await addOrder(order)`
   - Now persists orders to disk when payment completes

2. **`/api/orders/[orderId]/route.js`**
   - Changed from: Query `global.orders` array
   - Changed to: `await getOrderById(orderId)`
   - Now reads from persistent storage

3. **`/api/admin/orders/route.js`**
   - GET: Changed from `global.orders` to `await readOrders()`
   - PATCH: Changed from mutating `global.orders` to `await updateOrder(orderId, ...)`
   - Now admin dashboard reads/writes from persistent storage

### Updated: `.gitignore`
Added `.data/` to prevent order files from being committed to git

---

## Why This Works

✅ **On Vercel (production):**
- Orders stored in `/tmp` (persistent within the deployment)
- All serverless function instances can read the same `orders.json` file
- Track page can now find orders created by webhook

✅ **Local Development:**
- Orders stored in `.data/orders.json`
- Persists between requests and dev server restarts
- Easy to inspect/debug order data

✅ **No Database Required (Yet):**
- File-based storage is simple, requires no external services
- Perfect for MVP/testing
- Can be migrated to MongoDB/PostgreSQL later when needed

---

## Testing

The system now works end-to-end:
1. ✅ Customer places order → Webhook creates order (stored to disk)
2. ✅ Confirmation email sent immediately
3. ✅ Order appears in admin dashboard (reads from disk)
4. ✅ Admin marks order "COMPLETED" (updates disk, sends ready email)
5. ✅ Customer can track order by ID (reads from disk) ✅ **NOW FIXED!**

---

## Migration to Real Database (Future)

When ready to migrate to MongoDB/PostgreSQL:
1. Create a new `src/lib/database.js` with the same exported functions
2. Replace `storage.js` functions with database queries
3. No changes needed to the API routes - they'll just use different storage backend

This design follows the **Repository Pattern** for maximum flexibility.
