def longestSubstring(self, strs: list[str]) -> str:
    strs.sort(key=lambda x: len(x))
    shortest_str = strs[0]
    solve=['']

    for left in range(len(shortest_str)):
        for right in range(left,len(shortest_str)):

            if left==right: slice = shortest_str[left]
            else: slice = shortest_str[left:right]

            if all([True if slice in word else False for word in strs]): solve.append(slice)

    return sorted(solve, key=lambda x: len(x))[-1]
