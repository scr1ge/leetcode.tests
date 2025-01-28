def longestCommonPrefix(self, strs: list[str]) -> str:

    strs.sort(key=lambda x: len(x))
    shortest_str = strs[0][::-1]

    for i in range(len(shortest_str)):
        if all([True if shortest_str[i:][::-1] in word[:len(shortest_str[i:])] else False for word in strs]): return shortest_str[i:][::-1]
        
    return ''
