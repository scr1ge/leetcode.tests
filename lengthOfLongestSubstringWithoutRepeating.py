def lengthOfLongestSubstringWithoutRepeating(self, s: str) -> int:  #  O(N) !!

    bin = set()
    temp,solve = 0,0
    lst=[]

    for i in range(len(s)):
        if s[i] not in bin:
            lst.append(s[i])
            bin.add(s[i])
            temp+=1
        else:
            lst=lst[lst.index(s[i])+1:]
            solve = max(solve,temp)
            lst.append(s[i])
            temp = len(lst)
            bin=set(lst)

    solve = max(solve,temp)

    return solve
