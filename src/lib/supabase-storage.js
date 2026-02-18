import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client - uses service role key for admin operations
 * This client has full access to all database operations
 * Should ONLY be used on the server side
 */
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TABLE_NAME = "orders";

/**
 * Add a new order to Supabase
 */
export async function addOrder(order) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([order])
      .select();

    if (error) {
      console.error("Error adding order to Supabase:", error);
      throw new Error(`Failed to add order: ${error.message}`);
    }

    return data[0];
  } catch (err) {
    console.error("Error in addOrder:", err);
    throw err;
  }
}

/**
 * Get all orders from Supabase
 */
export async function readOrders() {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error reading orders from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error in readOrders:", err);
    return [];
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", orderId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows found" error
      console.error("Error fetching order from Supabase:", error);
      return null;
    }

    return data || null;
  } catch (err) {
    console.error("Error in getOrderById:", err);
    return null;
  }
}

/**
 * Update an order in Supabase
 */
export async function updateOrder(orderId, updates) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Error updating order in Supabase:", error);
      return null;
    }

    return data[0] || null;
  } catch (err) {
    console.error("Error in updateOrder:", err);
    return null;
  }
}

/**
 * Delete an order from Supabase
 */
export async function deleteOrder(orderId) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", orderId)
      .select();

    if (error) {
      console.error("Error deleting order from Supabase:", error);
      return null;
    }

    return data[0] || null;
  } catch (err) {
    console.error("Error in deleteOrder:", err);
    return null;
  }
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status) {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders by status from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Error in getOrdersByStatus:", err);
    return [];
  }
}
