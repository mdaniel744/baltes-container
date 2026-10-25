import { supabase, STORE_ID } from "./client";

export async function submitInquiry({ productId, name, email, phone, message, details }) {
  const { error } = await supabase.from("inquiries").insert({
    store_id: STORE_ID,
    product_id: productId ?? null,
    customer_name: name,
    customer_email: email,
    customer_phone: phone || null,
    message,
    details: details ?? {},
  });
  if (error) throw error;
}
