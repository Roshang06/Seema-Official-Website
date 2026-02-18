# Supabase Orders Migration - Setup Instructions

## Changes Made

### 1. **New Supabase Storage Layer** (`src/lib/supabase-storage.js`)
Created a new storage module that replaces the file-based storage with Supabase database operations:
- `addOrder()` - Insert new orders
- `readOrders()` - Fetch all orders
- `getOrderById()` - Fetch a specific order
- `updateOrder()` - Update order status and other fields
- `deleteOrder()` - Delete orders
- `getOrdersByStatus()` - Query orders by status

### 2. **Updated Webhook Handler** (`src/app/api/webhook/route.js`)
- Changed import from `lib/storage` to `lib/supabase-storage`
- Updated order object to use snake_case field names (matches Supabase database conventions):
  - `stripeSessionId` → `stripe_session_id`
  - `customerName` → `customer_name`
  - `customerEmail` → `customer_email`
  - `customerPhone` → `customer_phone`
  - `stripeFee` → `stripe_fee`
  - `createdAt` → `created_at`

### 3. **Updated Admin Orders API** (`src/app/api/admin/orders/route.js`)
- Changed imports to use Supabase storage
- Added field name conversion from snake_case (database) to camelCase (frontend compatibility)
- GET endpoint returns all orders from Supabase
- PATCH endpoint updates order status in Supabase and sends completion emails

### 4. **Removed Old Storage**
- Deleted `src/lib/storage.js` (file-based server memory storage)
- No more ephemeral storage on Vercel's `/tmp` or local `.data` directory

## Supabase Setup Required

You need to create an `orders` table in your Supabase database with the following schema:

```sql
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  stripe_session_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'PENDING',
  items JSONB,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  subtotal DECIMAL(10, 2),
  tax DECIMAL(10, 2),
  stripe_fee DECIMAL(10, 2),
  total DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

## Environment Variables

Make sure your `.env.local` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Data Flow

1. **Checkout**: Customer enters info → Stripe session created
2. **Payment**: Customer completes payment on Stripe
3. **Webhook**: Stripe sends `checkout.session.completed` event
   - Order data stored in Supabase `orders` table
   - Confirmation email sent to customer
4. **Admin Dashboard**: 
   - Fetches all orders from Supabase
   - Displays with real-time refresh (3 seconds)
   - Can mark orders as COMPLETED or CANCELLED
   - Sends ready-to-pickup email when marked complete
5. **Persistence**: All orders permanently stored in Supabase for financial tracking

## Benefits

✅ **Persistent Storage**: Orders survive server restarts and redeployments
✅ **Financial Records**: Complete order history for accounting/audits
✅ **Scalability**: No file system limitations
✅ **Security**: Database-level access control
✅ **Admin Dashboard**: Real-time order viewing and management
✅ **Email Notifications**: Automatic confirmation and ready-to-pickup emails
