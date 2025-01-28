def romanToInt(self, s: str) -> int:
    s = list(s+'/')
    roman={
        '/':0, #заплатка
        'I':1,
        'V':5,
        'X':10,
        'L':50,
        'C':100,
        'D':500,
        'M':1000
        }

    temp=['/']+[[roman[s[i+1]]-roman[s[i]],'next_bin'] if (roman[s[i]]<roman[s[i+1]]) else [roman[s[i]]] for i in range(len(s)-1)] 
    return sum([0 if len(temp[i-1])>1 else temp[i][0] for i in range(1,len(temp))])
