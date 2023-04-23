# #基础

```c++
//构造函数
string s1();  // si = ""
string s2("Hello");  // s2 = "Hello"
string s3(4, 'K');  // s3 = "KKKK"
string s4("12345", 1, 3);  //s4 = "234"，即 "12345" 的从下标 1 开始，长度为 3 的子串
//长度 
length
//连接
+ & append
string s1("123"), s2("abc");
s1.append(s2);  // s1 = "123abc"
s1.append(s2, 1, 2);  // s1 = "123abcbc"
s1.append(3, 'K');  // s1 = "123abcbcKKK"
s1.append("ABCDE", 2, 3);  // s1 = "123abcbcKKKCDE"，添加 "ABCDE" 的子串(2, 3)
//比较
<、<=、==、!=、>=、> ， compare
string s1("hello"), s2("hello, world");
int n = s1.compare(s2);
n = s1.compare(1, 2, s2, 0, 3);  //比较s1的子串 (1,2) 和s2的子串 (0,3)
n = s1.compare(0, 2, s2);  // 比较s1的子串 (0,2) 和 s2
n = s1.compare("Hello");
n = s1.compare(1, 2, "Hello");  //比较 s1 的子串(1,2)和"Hello”
n = s1.compare(1, 2, "Hello", 1, 2);  //比较 s1 的子串(1,2)和 "Hello" 的子串(1,2)
//子串
string s1 = "this is ok";
string s2 = s1.substr(2, 4);  // s2 = "is i"   substr(pos1,n)//pos1->n
s2 = s1.substr(2);  // s2 = "is is ok"    substr(n) //n->end
//交换                        
s1.swap(s2);
//查找
find：从前往后查找子串或字符出现的位置。
rfind：从后往前查找子串或字符出现的位置。
find_first_of：从前往后查找何处出现另一个字符串中包含的字符。例如：
s1.find_first_of("abc");  //查找s1中第一次出现"abc"中任一字符的位置
find_last_of：从后往前查找何处出现另一个字符串中包含的字符。
find_first_not_of：从前往后查找何处出现另一个字符串中没有包含的字符。
find_last_not_of：从后往前查找何处出现另一个字符串中没有包含的字符。
//删除
string s1("Real Steel");
s1.erase(1, 3);  //删除子串(1, 3)，此后 s1 = "R Steel"
s1.erase(5);  //删除下标5及其后面的所有字符，此后 s1 = "R Ste"
//插入
string s1("Limitless"), s2("00");
s1.insert(2, "123");  //在下标 2 处插入字符串"123"，s1 = "Li123mitless"
s1.insert(3, s2);  //在下标 2 处插入 s2 , s1 = "Li10023mitless"
s1.insert(3, 5, 'X');  //在下标 3 处插入 5 个 'X'，s1 = "Li1XXXXX0023mitless"
//istringstream 和 ostringstream
#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main()
{
    string src("Avatar 123 5.2 Titanic K");
    istringstream istrStream(src); //建立src到istrStream的联系
    string s1, s2;
    int n;  double d;  char c;
    istrStream >> s1 >> n >> d >> s2 >> c; //把src的内容当做输入流进行读取
    ostringstream ostrStream;
    ostrStream << s1 << endl << s2 << endl << n << endl << d << endl << c <<endl;
    cout << ostrStream.str();
    return 0;
}
//排序
sort(s.begin(), s.end());
```



# #字符串比较

## [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

```c++
bool isAnagram(string s, string t) {    
    if(s.length()!=t.length()){return false;}
    vector<int> judge(26,0);
    for(int i=0;i<s.length();i++){
        ++judge[s[i]-'a'];
        --judge[t[i]-'a'];
    }
    for(int i=0;i<26;i++){
        if(judge[i]){return false;}
    }
    return true;
}
```

## [205. 同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)

```c++
bool isIsomorphic(string s, string t) {
        vector<int> s_first_index(256,0), t_first_index(256,0);
        for(int i=0; i<s.size(); i++){
            if(s_first_index[s[i]]!=t_first_index[t[i]]){
                return false;
            }
            s_first_index[s[i]] = t_first_index[t[i]] = i+1;//默认是0
        }
        return true;
}
```

## [647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

```c++
class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;
        for (int i=0; i<s.length();i++){
            count+= extendsubstring(s,i,i);
            count+= extendsubstring(s,i,i+1);
        }
        return count;
    }

    int extendsubstring(string s, int l, int r){
        int count = 0;
        while (l>=0 && r<s.length() && s[l]==s[r]){
            count++;
            l--;
            r++;
        }
        return count;
    }
};
```

## [696. 计数二进制子串](https://leetcode-cn.com/problems/count-binary-substrings/)

```c++
// class Solution {
// public:
//     int countBinarySubstrings(string s) {
//        int pre=0, cur=1, count =0;
//        for(int i=1;i<s.length();i++){
//            if(s[i]==s[i-1]){
//                cur++;
//            }else{
//                pre=cur;
//                cur=1;
//            }
//            if(pre>=cur){
//                count++;
//            }
//        }
//        return count;
//     }
// };

class Solution{
public:
    int countBinarySubstrings(string s){
        vector<int> count;
        int ptr=0;
        while(ptr<s.length()){
            char c = s[ptr];
            int cout = 0;
            while(s[ptr]==c && ptr<s.length()){
                ptr++;
                cout++;
            }
            count.push_back(cout);
        }
        int ret =0;
        for(int i=1;i<count.size();i++){
            ret += min(count[i],count[i-1]);
        }
        return ret;
    }
};///eg.{00111011}->{2312}->{2(min(2,3))+1+1=4}
```

# #字符串理解

## [227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

```c++
class Solution {
public:
    int calculate(string s) {
        vector<int> stk;
        char preSign = '+';
        int num = 0;
        int n = s.length();
        for (int i = 0; i < n; ++i) {
            if (isdigit(s[i])) {
                num = num * 10 + int(s[i] - '0');
            }
            if (!isdigit(s[i]) && s[i] != ' ' || i == n - 1) {
                switch (preSign) {
                    case '+':
                        stk.push_back(num);
                        break;
                    case '-':
                        stk.push_back(-num);
                        break;
                    case '*':
                        stk.back() *= num;
                        break;
                    default:
                        stk.back() /= num;
                }
                preSign = s[i];
                num = 0;
            }
        }
        return accumulate(stk.begin(), stk.end(), 0);
    }
};///利用栈的概念

class Solution {
public:
    int calculate(string s) {
        int i=0;
        return parseExpr(s,i);
    }
    int parseExpr(const string& s, int& i){
        char op = '+';
        long left = 0, right = 0;
        while(i < s.length()){
            if(s[i] != ' '){
                long n = parseNum(s,i);
                switch(op){
                    case '+' : left += right; right = n; break;
                    case '-' : left += right; right = -n;break;
                    case '*' : right *= n;break;
                    case '/' : right /= n;break;
                }
                if(i < s.length()){
                    op = s[i];
                }
            }
            i++;
        }
        return left + right;
    }

    long parseNum(const string& s, int& i){
        long n = 0;
        while(i<s.length()&& isdigit(s[i])){
            n = n*10 + (s[i]-'0');
            i++;
        }
        return n;
    }
};
```

## [772. 基本计算器 III](https://leetcode-cn.com/problems/basic-calculator-iii/)

实现一个基本的计算器来计算简单的表达式字符串。

表达式字符串只包含非负整数，算符 `+`、`-`、`*`、`/` ，**左括号 `(` 和右括号 `)`** 。整数除法需要 **向下截断** 。

你可以假定给定的表达式总是有效的。所有的中间结果的范围为 `[-231, 231 - 1]` 。

```c++
class Solution {
public:
    int calculate(string s) {
        char sign = '+';        //初始符号默认为正
        long num = 0;           //num表示当前数值
        long res = 0;           //res表示最终结果
        stack<long> stk;
        int i = 0;
        while (i < s.size())
        {
            if (isdigit(s[i])) num = num * 10 + s[i] - '0';
            else if (s[i] == '(')
            {
                int cnt = 0;
                int j = i;
                for (; i < s.size(); i ++ )                     //判断这个左括号的范围
                {
                    if (s[i] == '(') cnt ++ ;                   //括号套娃，则计数加1
                    if (s[i] == ')') cnt -- ;
                    if (cnt == 0) break;                        //计数为0说明括号闭合
                }
                num = calculate(s.substr(j + 1, i - j - 1));    //递归计算括号内表达式
            }

            if (s[i] == '+' || s[i] == '-' || s[i] == '*' || s[i] == '/' || i == s.size() - 1){
                if (sign == '+') stk.push(num);
                else if (sign == '-') stk.push(-num);
                else if (sign == '*'){
                    int tmp = stk.top();
                    stk.pop();
                    stk.push(tmp * num);
                }
                else if (sign == '/'){
                    int tmp = stk.top();
                    stk.pop();
                    stk.push(tmp / num);
                }
                sign = s[i];            //更新符号
                num = 0;                //重置当前数值
            }
            i++ ;
        }
        while (stk.size())              //栈中此时只剩下优先级最低的加法运算（减法变成了加一个负数）
        {
            res += stk.top();
            stk.pop();
        }

        return res;
    }
};
```



# #字符串匹配

## [28. 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/)  ///KMP算法

判断是不是“子字符串“

```c++
class Solution {
public:
    ////暴力
    int strStr(string haystack, string needle) {
        if(needle.empty()) return 0;
        int len1 = needle.size();
        int len2 = haystack.size();
        for(int i=0; i< len2; i++){
            string subhay = haystack.substr(i,len1);
            if(strcmp(subhay.c_str(),needle.c_str()) == 0){
                return i;
            }
        }
        return -1;
    }
};

////KMP
class Solution {
public:
    void getNext(int* next, const string& s) {
        int j = 0;
        next[0] = 0;
        for(int i = 1;i < s.size();i++)
        {
            while(j > 0 && s[i] != s[j])
                j = next[j - 1];
            if(s[i] == s[j])    
                j++;
            next[i] = j;//更新next数组
        }
    }
    int strStr(string haystack, string needle) {
        if (needle.size() == 0) {
            return 0;
        }
        int next[needle.size()];
        getNext(next, needle);
        int j = 0; // // 因为next数组里记录的起始位置为0
        for (int i = 0; i < haystack.size(); i++) { // 注意i就从0开始
            while(j > 0 && haystack[i] != needle[j])// 不匹配
                j = next[j - 1]; // j 寻找之前匹配的位置

            if (haystack[i] == needle[j]) // 匹配，j和i同时向后移动 
                j++; 

            if (j == needle.size()) // 文本串s里出现了模式串t
                return (i - needle.size() + 1); 
        }
        return -1;
    }
};
```

