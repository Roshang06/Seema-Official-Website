import fs from "fs/promises";
import path from "path";

// Use /tmp for Vercel (ephemeral but persists within same deployment)
// Use local .data directory for development
const getStoragePath = () => {
  // On Vercel, use /tmp; locally, use .data folder
  const dataDir =
    process.env.VERCEL === "1"
      ? "/tmp"
      : path.join(process.cwd(), ".data");

  return path.join(dataDir, "orders.json");
};

export async function readOrders() {
  try {
    const filePath = getStoragePath();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // File doesn't exist yet or other error, return empty array
    if (err.code === "ENOENT") {
      return [];
    }
    console.error("Error reading orders:", err);
    return [];
  }
}

export async function writeOrders(orders) {
  try {
    const filePath = getStoragePath();
    const dir = path.dirname(filePath);

    // Create directory if it doesn't exist
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }

    await fs.writeFile(filePath, JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Error writing orders:", err);
    throw err;
  }
}

export async function addOrder(order) {
  const orders = await readOrders();
  orders.push(order);
  await writeOrders(orders);
  return order;
}

export async function getOrderById(orderId) {
  const orders = await readOrders();
  return orders.find((o) => o.id === orderId);
}

export async function updateOrder(orderId, updates) {
  const orders = await readOrders();
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return null;
  }

  orders[orderIndex] = { ...orders[orderIndex], ...updates };
  await writeOrders(orders);
  return orders[orderIndex];
}
