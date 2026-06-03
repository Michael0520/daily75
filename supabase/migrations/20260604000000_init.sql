-- progress table
CREATE TABLE IF NOT EXISTS progress (
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id  int  NOT NULL,
  status      text NOT NULL CHECK (status IN ('unsolved', 'attempted', 'solved')) DEFAULT 'unsolved',
  attempts    int  NOT NULL DEFAULT 0,
  solved_at   timestamptz,
  PRIMARY KEY (user_id, problem_id)
);

-- submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id  int  NOT NULL,
  language    text NOT NULL CHECK (language IN ('javascript', 'typescript')),
  code        text NOT NULL,
  passed      boolean NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_progress" ON progress FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_submissions" ON submissions FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
