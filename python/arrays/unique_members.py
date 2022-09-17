from ..util import print_results, identical_functions

# Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?
# Hints: #44, # 777, # 732

# O(N) 
def is_unique(str):
  members = set()
  for c in str:
    if (c in members): # O(1) avg hashtable lookup
      return False
    else:
      members.add(c) # O(1) avg hashtable insert
  return True

def is_unique_bf(string: str):
  for idx1 in range(0, len(string) - 1):
    for idx2 in range(idx1 + 1, len(string)): # N - 1 + N - 2 + N - 3 + ... + 1 = Σ N(1 - x/N), x [1, N] < Σ N = N^2
      if (string[idx1] == string[idx2]):
        return False
  return True

def is_unique_2(string: str):
  string = sorted(string)
  for idx in range(1, len(string) - 1):
    if (string[idx - 1] == string[idx]):
      return False
  return True

inputs = [("123",), ("qwerty124",), (" ",), ("",), ("aba",), ("a1a1b",), ("1234567890",), ("12345678901",)]

identical_functions((is_unique, is_unique_bf, is_unique_2), inputs)
print_results(is_unique_2, inputs)
