from unittest import result


def print_results(func, inputs):
  for i in inputs:
    print("'{}': '{}'".format(i, func(*i)))

def identical_functions(funcs, inputs):
  for i in inputs:
    results = list(map(lambda f: f(*i), funcs))
    identical = all(x == results[0] for x in results)
    assert identical
