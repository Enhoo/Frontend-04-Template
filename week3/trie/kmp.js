function kmp(source, pattern) {
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1, j = 0;
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++i, ++j;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i
                }
            }
        }
    }
    {
        let i = 0, j = 0;
        while (i < source.length) {
            // pattern 匹配到最后 结束
            if (j === pattern.length) {
                return true
            }
            if (pattern[j] === source[i]) {
                ++i, ++j;
            } else {
                if (j > 0)
                    j = table[j]
                else
                    ++i
            }
            // source 到最后 结束
            return false
        }
    }
}

console.log(kmp('abababbc', 'bb'))

// a b a b a b b c
// 0 0 0 1 2 3 4 0