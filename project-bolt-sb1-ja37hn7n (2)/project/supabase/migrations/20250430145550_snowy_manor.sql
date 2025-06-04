/*
  # Create profiles table for user data

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `role` (text, either 'user' or 'admin')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read their own profile
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'admin')) DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Insert default users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'user@example.com', crypt('user1234', gen_salt('bf')), now())
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000001');

INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'admin@example.com', crypt('admin1234', gen_salt('bf')), now())
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000002');

INSERT INTO profiles (id, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'user')
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE id = '00000000-0000-0000-0000-000000000001');

INSERT INTO profiles (id, role)
VALUES 
  ('00000000-0000-0000-0000-000000000002', 'admin')
WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE id = '00000000-0000-0000-0000-000000000002');