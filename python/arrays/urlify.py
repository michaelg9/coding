from operator import le
from ..util import print_results, identical_functions

"""
URLify: Write a method to replace all spaces in a string with '%20': 
You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string.
(Note: if implementing in Java, please use a character array so that you can perform this operation in place.)
SOLUTION
EXAMPLE
Input: "Mr John Smith    ", 13 Output: "Mr%20John%20Smith"
"""

"""
time: O(N) since two passes
space: O(1)
"""
def urlify(string: "list[str]", length: int):
  spaces = 0
  for i in range(length):
    if string[i] == ' ':
      spaces = spaces + 1

  for i in range(length - 1, 0, -1):
    displacement = spaces * 2
    if string[i] == ' ':
      spaces = spaces - 1
      displacement = spaces * 2
      string[i + displacement] = '%'
      string[i + displacement + 1] = '2'
      string[i + displacement + 2] = '0'
    else:
      string[i + displacement] = string[i]
  return "".join(string)

inputs = [(list("Mr John Smith    "), 13), (list("Mr John Will Dufus Smith        "), 24), (list("qwerty124"), 9), (list(" "), 0), (list(""), 0)]

identical_functions((urlify, urlify, urlify), inputs)
print_results(urlify, inputs)
