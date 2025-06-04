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
  ('00000000-0000-0000-0000-000000000001', 'user@example.com', crypt('user1234', gen_salt('bf')), now()),
  ('00000000-0000-0000-0000-000000000002', 'admin@example.com', crypt('admin1234', gen_salt('bf')), now());

INSERT INTO profiles (id, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'user'),
  ('00000000-0000-0000-0000-000000000002', 'admin');