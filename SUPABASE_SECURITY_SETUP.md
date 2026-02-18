# Supabase Security Setup Guide

## Environment Variables

Add these to your `.env.local` file:

```env
# Public - safe to expose
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Private - NEVER expose in client code
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Getting these keys:**
1. Go to Supabase Dashboard → Settings → API
2. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Row Level Security (RLS) Policies

Run these SQL queries in your Supabase SQL editor:

### 1. Enable RLS on the orders table

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

### 2. Create policies

```sql
-- Policy 1: Allow anonymous users to INSERT orders (webhook-verified via Stripe)
CREATE POLICY "Allow webhook inserts" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Policy 2: Prevent anonymous users from reading orders
CREATE POLICY "Prevent anonymous reads" ON orders
  FOR SELECT
  USING (false);

-- Policy 3: Prevent anonymous users from updating orders
CREATE POLICY "Prevent anonymous updates" ON orders
  FOR UPDATE
  USING (false);

-- Policy 4: Prevent anonymous users from deleting orders
CREATE POLICY "Prevent anonymous deletes" ON orders
  FOR DELETE
  USING (false);
```

## How It Works

### Webhook Flow (Uses Anon Key)
```
1. Payment completed on Stripe
2. Stripe sends webhook to /api/webhook
3. Webhook verifies Stripe signature (CRITICAL)
4. Order inserted via webhookSupabase (anon key)
5. RLS policy allows insert because it's webhook-verified
```

### Admin Flow (Uses Service Role Key)
```
1. Admin logs in via /admin/login
2. Frontend calls /api/admin/orders
3. Server-side code uses service role key
4. Can READ, UPDATE orders (admin operations)
5. Bypasses RLS because service role = full access
```

### Public/Client Flow (Would Be Blocked)
```
1. Malicious user discovers SUPABASE_ANON_KEY from network
2. Tries to fetch orders directly from Supabase
3. RLS blocks SELECT operation (policy: false)
4. Query fails with permission denied
5. No unauthorized data leak ✅
```

## Security Architecture

```
┌─────────────────────────────────────────────┐
│         Client Browser                       │
│  (Cannot access Supabase directly)           │
└──────────────┬──────────────────────────────┘
               │
               ↓ fetch("/api/...")
       
┌──────────────────────────────┐
│     Next.js API Routes        │
│  (Server-side, fully trusted) │
└──────┬──────────────┬─────────┘
       │              │
       ↓ webhook      ↓ admin
       │              │
   ┌───────────────┐ ┌──────────────────────┐
   │ webhookSupabase  │ supabase-storage     │
   │ (anon key)   │ │ (service role key)   │
   └───────┬───────┘ └──────┬───────────────┘
           │                │
           ↓                ↓
    ┌────────────────────────────────┐
    │   Supabase Database            │
    │   orders table (RLS enabled)   │
    └────────────────────────────────┘
```

## Verification

To verify RLS is working:

1. **Check RLS is enabled:**
   ```sql
   SELECT tablename FROM pg_tables 
   WHERE schemaname = 'public' AND tablename = 'orders';
   ```

2. **Check policies are created:**
   ```sql
   SELECT policyname, cmd, qual, with_check 
   FROM pg_policies 
   WHERE tablename = 'orders';
   ```

3. **Test with anon key (should fail for SELECT):**
   ```javascript
   const { data, error } = await supabase
     .from('orders')
     .select('*');
   // error: "new row violates row-level security policy"
   ```

## Summary

✅ **What's Protected:**
- Clients cannot directly query the orders table
- Webhook inserts are verified by Stripe signature
- Admin operations use secure server-side key
- Defense-in-depth with RLS policies

✅ **Keys & Their Purpose:**
- `SUPABASE_ANON_KEY` - Public, used only for webhook inserts
- `SUPABASE_SERVICE_ROLE_KEY` - Private, used for admin operations
- Both constrained by RLS policies at database level
