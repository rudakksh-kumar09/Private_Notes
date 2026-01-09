// ===========================================
// NOTES API SERVICE
// ===========================================
// All CRUD operations for notes
// Protected by Supabase RLS - users can only access their own notes

import { supabase } from '../lib/supabase';

// ===========================================
// FETCH ALL NOTES for current user
// ===========================================
// RLS Policy: Only returns notes where user_id = auth.uid()
export const fetchNotes = async () => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return { data: null, error: error.message };
  }
};

// ===========================================
// FETCH SINGLE NOTE by ID
// ===========================================
// RLS Policy: Only returns note if user_id = auth.uid()
export const fetchNoteById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching note:', error);
    return { data: null, error: error.message };
  }
};

// ===========================================
// CREATE NEW NOTE
// ===========================================
// RLS Policy: Can only insert notes where user_id = auth.uid()
export const createNote = async (title, content) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user.id,
          title: title.trim(),
          content: content.trim(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating note:', error);
    return { data: null, error: error.message };
  }
};

// ===========================================
// UPDATE EXISTING NOTE
// ===========================================
// RLS Policy: Can only update notes where user_id = auth.uid()
export const updateNote = async (id, title, content) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({
        title: title.trim(),
        content: content.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating note:', error);
    return { data: null, error: error.message };
  }
};

// ===========================================
// DELETE NOTE
// ===========================================
// RLS Policy: Can only delete notes where user_id = auth.uid()
export const deleteNote = async (id) => {
  try {
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting note:', error);
    return { error: error.message };
  }
};

// ===========================================
// SECURITY NOTES:
// ===========================================
// 1. All operations are protected by RLS policies
// 2. Users can NEVER access other users' notes
// 3. The database enforces privacy at the row level
// 4. Even if the frontend is compromised, data remains secure
// ===========================================
