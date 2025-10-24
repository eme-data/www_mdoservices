import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uenvwxqsapvewordkqfa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbnZ3eHFzYXB2ZXdvcmRrcWZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4ODg5OTIsImV4cCI6MjAyNTQ2NDk5Mn0.p2M2j_tV112442uF21aE4p3s2e_xFi_3qG5qVwz2spY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchPricingItems() {
  const { data, error } = await supabase
    .from('pricing_items')
    .select('*')
    .order('display_order')

  if (error) {
    console.error('Error fetching pricing items:', error)
    throw error
  }

  return data
}

export async function updatePricingItem(id, updates) {
  const { data, error } = await supabase
    .from('pricing_items')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating pricing item:', error)
    throw error
  }

  return data[0]
}

export async function createPricingItem(item) {
  const { data, error } = await supabase
    .from('pricing_items')
    .insert([item])
    .select()

  if (error) {
    console.error('Error creating pricing item:', error)
    throw error
  }

  return data[0]
}

export async function deletePricingItem(id) {
  const { error } = await supabase
    .from('pricing_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting pricing item:', error)
    throw error
  }
}

export async function updatePricingOrder(items) {
  const updates = items.map((item, index) => ({
    id: item.id,
    display_order: index
  }))

  const { error } = await supabase
    .from('pricing_items')
    .upsert(updates)

  if (error) {
    console.error('Error updating pricing order:', error)
    throw error
  }
}

export async function fetchPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .filter('published_at', 'is', 'not.null')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching published posts:', error.message, error.details, error.hint, error.code)
    throw error
  }
  return data
}

export async function fetchPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .filter('published_at', 'is', 'not.null')
    .lte('published_at', new Date().toISOString())
    .single()

  if (error) {
    console.error(`Error fetching post by slug ${slug}:`, error.message, error.details, error.hint, error.code)
    throw error
  }
  return data
}