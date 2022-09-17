from ..util import print_results, identical_functions
# 1.2 Check Permutation: Given two strings, write a method to decide if one is a permutation of the other.

# space: O(N) is not in place sorting else O(1)
# time: O(NlogN) due to sorting
def is_permutation(str1: str, str2: str):
  if (len(str1) != len(str2)):
    return False
  else: 
    return sorted(str1) == sorted(str2) # O(N) comparison, O(NlogN) sorts
  
# space: O(N), max charset size
# time O(N)
def is_permutation_map(str1: str, str2: str):
  counts = {}
  for c in str1:
    count = counts.get(c, 0) + 1
    counts[c] = count
  for c in str2:
    count = counts.get(c, 0) - 1
    if (count < 0):
      return False
    counts[c] = count
  return True

inputs = [("abc", "def"), ("abc", "aba"), ("aba", "abx"),("aba", "aba"), ("aba", "abaa"), ("cfds", "sdcf"), ("", " ")]

identical_functions((is_permutation, is_permutation_map), inputs)
print_results(is_permutation, inputs)
