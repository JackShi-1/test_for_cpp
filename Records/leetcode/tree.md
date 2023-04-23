```c++
struct TreeNode{
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr){}
}
```

# #递归

递归三要素：

1、确定递归函数的参数和返回值；

2、确定终止条件；

3、确定单层递归的逻辑。

# 104. 二叉树的最大深度//后序

```c++
int maxDepth(TreeNode* root) {
        if(root == NULL) return 0;
        return 1 + max(maxDepth(root->left),maxDepth(root->right));
}///精简写法

int maxDepth(TreeNode* root){
    return getDepth(root);
}
int getDepth(TreeNode* root){
    if(root==null) return 0;
    int left = getDepth(root->left);
    int right= getDepth(root->right);
    int depth = 1 + max(left,right);
    return depth;
}
```

# [111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```c++
class Solution {
public:
    int minDepth(TreeNode* root) {
        return getdepth(root);
    }
    int getdepth(TreeNode* root){
        if(root==nullptr) return 0;
        
        int left = getdepth(root->left);
        int right = getdepth(root->right);

        if(root->left==nullptr && root->right!=nullptr){
            return 1+right;
        }
        if(root->left!=nullptr && root->right==nullptr){
            return 1+left;
        }
        return 1+min(left,right);
    }
};
```

# 110. 平衡二叉树

```c++
class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return root ? abs(getheight(root->left)-getheight(root->right))<=1 && isBalanced(root->left) && isBalanced(root->right) : true;
    }

    int getheight(TreeNode* root){
        return root ? 1+max(getheight(root->left),getheight(root->right)) : 0;
    }
};

//获得高度的同时进行处理
    bool isBalanced(TreeNode* root){
        return helper(root)!=-1;
    }
    int helper(TreeNode* root){
        if(!root) return 0;//这一路走到底
        int tleft = helper(root->left), tright = helper(root->right);
        if(tleft == -1 || tright == -1 || abs(tleft-tright)>1){
            return -1;
        } //两条线//这一路碰到不平衡的情况就下车
        //if(tleft==-1) return -1;
        //if(tright==-1) return -1;
        //if(abs(tleft-tright)>1){
        //	return -1;
        //}else{return 1+max(tleft,tright);}
        return 1 + max(tleft,tright);
    }
```

# 543. 二叉树的直径

```c++
class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int ans = 0;
        helper(root,ans);
        return ans;
    }
    int helper(TreeNode* root, int& ans){
        if(!root) return 0;
        int l=helper(root->left,ans), r=helper(root->right,ans);
        ans = max(l+r,ans);
        return max(l,r)+1;
    }
};
```

# [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)-1

**从根节点到叶子节点**

```c++
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if(!root) return false;
        if(root->left == nullptr && root->right == nullptr){
            return targetSum == root->val;
        }
        return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val); 
    }//dfs
    
    bool traversal(TreeNode* root, int count) {
        if(root->left == nullptr && root->right == nullptr){
            return count == 0;
        }
        if(root->left){
            count -= root->left->val;
            if(traversal(root->left, count)) return true;
            count += root->left->val;
        }
        if(root->right){
            count -= root->right->val;
            if(traversal(root->right, count)) return true;
            count += root->right->val;
        } 
        return false;
    }
    bool hasPathSum(TreeNode* root, int sum){
        if(root==nullptr) return 0;
        return traverse(root, sum - root->val);
    }
};///详细

    bool hasPathSum(TreeNode* root, int targetSum) {
        if(!root) return false;
        queue<TreeNode*> q_node;
        q_node.push(root);
        queue<int> q_tmp;
        q_tmp.push(root->val);
        while(!q_node.empty()){
            int len = q_node.size();
            for(int i=0; i<len; i++){
                TreeNode* node = q_node.front();
                q_node.pop();
                int tmp = q_tmp.front();
                q_tmp.pop();
                if(node->left == nullptr && node->right == nullptr){
                    if(tmp == targetSum) 
                        return true;
                    // continue;
                }
                if(node->left){
                    q_node.push(node->left);
                    q_tmp.push(tmp + node->left->val);
                }
                if(node->right) {
                    q_node.push(node->right);
                    q_tmp.push(tmp + node->right->val);
                }               
            }
        }
        return false;
    } //bfs   
```

# [113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

要把这个路径存下来

```c++
class Solution {
    vector<int> path;
    vector<vector<int>> ans;
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
         dfs(root, targetSum);
         return ans;
    }
    
    void dfs(TreeNode* node, int sum){
        if(!node) return;
        path.push_back(node->val);
        if(node->left == nullptr && node->right == nullptr && sum == node->val){
            ans.push_back(path);
            //return;
        }
        /*
        sum -= node-> val;
        dfs(node->left, sum);
        dfs(node->right, sum);
        */
        if(node->left) {
            sum -= node-> val;
            dfs(node->left, sum);
            sum += node-> val;
        }
        if(node->right) {
            sum -= node-> val;
            dfs(node->right, sum);
            sum += node-> val;
        }
        path.pop_back();
        
        
        //if(root->left){
        //	path.push_back(root->left->val);
        //  count -= root->left->val;
        //  dfs(root->left,sum);
        //	count += root->left->val;
        //	path.pop_back();
        //}
        //if(root->right){
        //	path.push_back(root->right->val);
        //  count -= root->right->val;
        //  dfs(root->right,sum);
        //	count += root->right->val;
        //	path.pop_back();
        //}
    }
};

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
    vector<vector<int>> ret;
    unordered_map<TreeNode*, TreeNode*> parent;
public:
    void getPath(TreeNode* node) {
        vector<int> tmp;
        while (node != nullptr) {
            tmp.emplace_back(node->val);
            node = parent[node];
        }
        reverse(tmp.begin(), tmp.end());
        ret.emplace_back(tmp);
    }

    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        if(!root) return ret;
        queue<TreeNode*> q_node;
        q_node.push(root);
        queue<int> q_tmp;
        q_tmp.push(root->val);
        while(!q_node.empty()){
            int len = q_node.size();
            for(int i=0; i<len; i++){
                TreeNode* node = q_node.front();
                q_node.pop();
                int tmp = q_tmp.front();
                q_tmp.pop();
                if(node->left == nullptr && node->right == nullptr){
                    if(tmp == targetSum) 
                        getPath(node);
                }
                if(node->left){
                    parent[node->left] = node;//哈希表记录树中的每一个节点的父节点
                    q_node.push(node->left);
                    q_tmp.push(tmp + node->left->val);
                }
                if(node->right) {
                    parent[node->right] = node;
                    q_node.push(node->right);
                    q_tmp.push(tmp + node->right->val);
                }               
            }
        }
        return ret;
    }
};
```

# [437. 路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)

不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

```c++
//递归
class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        return root ? pathnumberwithroot(root,targetSum)+pathSum(root->left,targetSum)+pathSum(root->right,targetSum):0;
    }
    int pathnumberwithroot(TreeNode* root, int sum){
        if(!root) return 0;
        int count = root->val == sum ? 1: 0;
        count += pathnumberwithroot(root->left, sum-root->val);
        count += pathnumberwithroot(root->right, sum-root->val);
        return count;
    }
};
```

# [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)//后序

```c++
class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return root ? helper(root->left, root->right) : true;
    }
    bool helper(TreeNode* left, TreeNode* right){
        if(!left && !right){return true;}//两个都为空//终止条件
        if(!left || !right){return false;}//一个为空，另一个不为空//跳出
        if(left->val != right->val){return false;}//不等的时候为false//跳出
        return helper(left->left, right->right) && helper(left->right, right->left);
    }
};
```

# #层序遍历

# [637. 二叉树的层平均值](https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/)

```c++
class Solution {
public:
    vector<double> averageOfLevels(TreeNode* root) {
        vector<double> ans;
        if(!root) return ans;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()){
            int len = q.size();
            double sum = 0;//这边的数据格式为double
            for(int i=0; i<len; i++){
                TreeNode* tmp = q.front();
                q.pop();
                sum += tmp->val;
                if(tmp->left) q.push(tmp->left);
                if(tmp->right) q.push(tmp->right);
            }
            ans.push_back(sum / len);
        }
        return ans;
    }
};
```

# [199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

从右往左看的视角

```c++
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        if(!root) return {};
        vector<int> ans;
        queue<TreeNode*> stk;
        stk.push(root);
        while(!stk.empty()){
            int len=stk.size();
            for(int i=0; i<len; i++){
                TreeNode* tmp = stk.front();
                stk.pop();
                if(i==(len-1)){///i==len-1不对的
                    ans.push_back(tmp->val);
                }
                if(tmp->left) stk.push(tmp->left);
                if(tmp->right) stk.push(tmp->right);
            }    
        }
        return ans;
    }
};
```

# [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        queue<Node*> que;
        if(root) que.push(root);
        while(!que.empty()){
            Node* pre;
            int len = que.size();
            for(int i=0;i<len;i++){
                Node* tmp = que.front();
                que.pop();
                if(i==0){
                    pre = tmp;
                }else if(i==len-1){
                    pre->next=tmp;
                    pre = tmp;
                    tmp->next = NULL;
                }else{
                    pre->next=tmp;
                    pre = tmp;
                }
                if(tmp->left) que.push(tmp->left);
                if(tmp->right) que.push(tmp->right);
            }   
        }    
        return root;   
    }
};
```

# #前中后序遍历

# [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```c++
class Solution {
    int index = 0;
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        TreeNode* head;
        int left = 0, right = inorder.size();
        head = rebuilder(preorder,inorder,left,right);
        return head;
    }
    TreeNode* rebuilder(vector<int>& preorder,vector<int>& inorder,int left,int right){
        if(index == inorder.size()||left==right){
            return nullptr;
        }
        TreeNode* head = nullptr;
        for(int i=left; i<right; i++){///也可以用hash存下来，不用每次遍历
            if(preorder[index]==inorder[i]){
                head = new TreeNode(preorder[index]);
                index++;
                head->left = rebuilder(preorder,inorder,left,i);
                head->right = rebuilder(preorder,inorder,i+1,right);
                break;//没有这个break//i会一直往后走与preorder[index]比较//而我要的只是第一个
            }
        }
        return head;
    }
};
```

# [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

```c++
class Solution {
public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int left=0, right = postorder.size();///这里是左闭右开
        int index = postorder.size()-1;
        return rebuilder(inorder, postorder, left, right, index);
    }
    TreeNode* rebuilder(vector<int>& inorder, vector<int>& postorder, int left, int right, int& index){
        if(index < 0 || left==right){
            return nullptr;
        }
        TreeNode* head=nullptr;
        for(int i=left; i<right; i++){
            if(inorder[i]==postorder[index]){
                head = new TreeNode(postorder[index]);
                index--;
                head->right = rebuilder(inorder, postorder, i+1, right, index);
                head->left = rebuilder(inorder, postorder, left, i, index);
                break;
            }
        }
        return head;
    }
};
```



# [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```c++
//     vector<int> preorderTraversal(TreeNode* root) {
//         vector<int> res;
//         preorder(root,res);
//         return res;
//     }
//     void preorder(TreeNode* root, vector<int> &res){
//         if(root==nullptr){
//             return;
//         }
//         res.push_back(root->val);
//         preorder(root->left,res);
//         preorder(root->right,res);
//     }

class Solution{
    public:
    vector<int> preorderTraversal(TreeNode* root){
       vector<int> res;
       if(root==nullptr) return res;
       stack<TreeNode*> stk;
       while(!stk.empty() || root!=nullptr){
           while(root!=nullptr){
               res.emplace_back(root->val);
               stk.emplace(root);
               root=root->left;
           }
           root=stk.top();
           stk.pop();
           root=root->right;
       }
    return res;
    }
};

class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(!root) return ans;
        stack<TreeNode*> s;
        s.push(root);
        while(!s.empty()){
            TreeNode* node = s.top();
            s.pop();
            ans.push_back(node->val);  				//中
            if(node->right) s.push(node->right);	//左
            if(node->left) s.push(node->left);		//右
        }
        return ans;
    }
};
```

# [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```c++
class Solution{
public:
   vector<int> postorderTraversal(TreeNode* root){
       vector<int> res;
       if(root==nullptr){return res;}
       stack<TreeNode*> stk;
       TreeNode* node=nullptr;
       while(root!=nullptr || !stk.empty()){
           while(root!=nullptr){
              stk.emplace(root);
              root = root->left;
           }
           root = stk.top();
           stk.pop();
           if (root->right ==nullptr || root->right == node){//右节点为空或者遍历过了
               res.emplace_back(root->val);
               node = root;
               root = nullptr;
           }else{
               stk.emplace(root);
               root = root->right;
           }
       }
       return res;
   }
};

class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> ans;    
        if(!root) return ans;
        stack<TreeNode*> s;
        s.push(root);
        while(!s.empty()){
            TreeNode* node = s.top();
            s.pop();
            ans.push_back(node->val);			
            if(node->left) s.push(node->left);
            if(node->right) s.push(node->right); 
        }
        reverse(ans.begin(),ans.end()); ///反转就是了
        return ans;
    }
};
```

# [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```c++
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        if(root==nullptr){return res;}
        stack<TreeNode*> stk;
        TreeNode* node = root;///该指针node用来访问节点，访问到最底层
        while(node!=nullptr || !stk.empty()){
            while(node!=nullptr){
              stk.emplace(node);
              node = node->left;
            }
            node = stk.top();
            stk.pop();
            res.emplace_back(root->val);
            node = node->right;
           }
       return res;
       }
};
```

# #二叉查找树

# [99. 恢复二叉搜索树](https://leetcode-cn.com/problems/recover-binary-search-tree/)

```c++
class Solution {
public:
    void recoverTree(TreeNode* root) {
        if(!root) return;
        stack<TreeNode*> stk;
        TreeNode *prev = nullptr, *mistake1 = nullptr, *mistake2 = nullptr;
        while(!stk.empty() || root!=nullptr){
            while(root!=nullptr){
                stk.push(root);
                root = root ->left;
            }
            root = stk.top();
            stk.pop();
            if(prev && root->val < prev->val){
                if(!mistake1){
                    mistake1 = prev;
                    mistake2 = root;
                }else{mistake2 = root;}
            }//这里是核心
            prev = root;       
            root = root -> right;
        }
        if(mistake2 && mistake1){
            int tmp = mistake1->val;
            mistake1 -> val = mistake2 -> val;
            mistake2 -> val = tmp;
        }
    }  
};


class Solution {
    TreeNode* prev = nullptr;
    TreeNode* n1, *n2;
public:
    void recoverTree(TreeNode* root) {
        traverse(root);
        swap(n1->val, n2->val);
    }
    void traverse(TreeNode* node){
        if(!node) return;
        traverse(node->left);
        if(prev && node->val < prev->val){
            n1 = (n1==nullptr) ? prev : n1;
            n2 = node;
        }
        prev = node;
        traverse(node->right);
    }
};
```

# [669. 修剪二叉搜索树](https://leetcode-cn.com/problems/trim-a-binary-search-tree/)

```c++
class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if(!root) return root;
        if(root->val > high) return trimBST(root->left,low,high);
        if(root->val < low) return trimBST(root->right,low,high);
        root->left = trimBST(root->left,low,high);
        root->right = trimBST(root->right,low,high);
        return root;
    }
};
//无效或不在范围内，root为空，直接返回
//root->val < low: 说明目前root太小，root不在范围内，则需要去找root右边子树
//root->val > high: 说明现在root太大，root不在范围内，则需要去找root左边子树
//在范围内，那么继续构建它的左右子树即可（这里没有先后顺序的差异）

class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if(!root) return nullptr;
        //处理头结点，让root移动到[low，high]范围内，注意是左闭右闭
        while(root->val < low || root->val > high)
        {
            if(root->val < low) root = root->right;//小于low往右走
            else root = root->left;                //大于high往左走
            if(root == nullptr) break;             //结束循环的条件
        }
        TreeNode* cur = root;
        //此时root已经在[low，high]范围内，处理左孩子元素小于low的情况
        while(cur != nullptr)
        {
            while(cur->left && cur->left->val < low)
            {
                cur->left = cur->left->right;
            }
            cur = cur->left;
        }
        cur = root;
        //此时root已经在[low，high]范围内，处理右孩子大于high的情况
        while(cur != nullptr)
        {
            while(cur->right && cur->right->val > high)
            {
                cur->right = cur->right->left;
            }
            cur = cur->right;
        }
        return root;
    }
};
```

# #字典树

# [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

```c++
class TrieNode{
public:
    TrieNode* childNode[26];
    bool isval;
    TrieNode():isval(false){
        for(int i=0; i<26; i++){
            childNode[i] = nullptr;
        }
    }
};

class Trie {
    TrieNode* root;
public:
    
    /** Initialize your data structure here. */
    Trie() : root(new TrieNode()){}
    
    /** Inserts a word into the trie. */
    void insert(string word) {
        TrieNode* tmp = root;
        for(int i=0; i<word.size(); i++){
            if(!tmp->childNode[word[i]-'a']){
                tmp -> childNode[word[i]-'a'] = new TrieNode();
            }
            tmp = tmp -> childNode[word[i]-'a'];
        }
        tmp->isval = true;
    }
    
    /** Returns if the word is in the trie. */
    bool search(string word) {
        TrieNode* tmp = root;
        for(int i=0; i<word.size(); i++){
            if(!tmp){break;}
            tmp = tmp->childNode[word[i]-'a'];
        }
        return tmp ? tmp->isval : false;

    }
    
    /** Returns if there is any word in the trie that starts with the given prefix. */
    bool startsWith(string prefix) {
        TrieNode* tmp = root;
        for(int i=0; i<prefix.size(); i++){
            if(!tmp){break;}
            tmp = tmp->childNode[prefix[i]-'a'];
        }
        return tmp;
    }
};

class Trie {
private:
    vector<Trie*> children;
    bool isEnd;

    Trie* searchPrefix(string prefix) {
        Trie* node = this;
        for (char ch : prefix) {
            ch -= 'a';
            if (node->children[ch] == nullptr) {
                return nullptr;
            }
            node = node->children[ch];
        }
        return node;
    }

public:
    Trie() : children(26), isEnd(false) {}

    void insert(string word) {
        Trie* node = this;
        for (char ch : word) {
            ch -= 'a';
            if (node->children[ch] == nullptr) {
                node->children[ch] = new Trie();
            }
            node = node->children[ch];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        Trie* node = this->searchPrefix(word);
        return node != nullptr && node->isEnd;
    }

    bool startsWith(string prefix) {
        return this->searchPrefix(prefix) != nullptr;
    }
};
```

# #套路篇

## [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

**路径** 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

**路径和** 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。

```c++
class Solution {
    int ans = INT_MIN;
public:
    int maxPathSum(TreeNode* root) {
        getmaxlength(root);
        return ans;
    }
    int getmaxlength(TreeNode* root){
        if(!root) return 0;
        int left = max(0,getmaxlength(root->left));
        int right = max(0,getmaxlength(root->right));
        ans = max(ans, left+right+root->val);//return的是ans
        return max(left,right)+root->val;
    }
};///就是个后序遍历
```

## [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)////前序



# #特点

# [559. N 叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/)

```c++
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;
    Node() {}
    Node(int _val) {
        val = _val;
    }
    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
public:
    int maxDepth(Node* root) {
        if(root==0) return 0;
        int depth = 0 ;
        for(int i=0; i<root->children.size();i++){
            depth = max(depth, maxDepth(root->children[i]));
        }
        return depth + 1;//比完一行的时候+1       
    }
};
```

# [222. 完全二叉树的节点个数](https://leetcode-cn.com/problems/count-complete-tree-nodes/)

利用完全二叉树的特性，满二叉树的节点个数位 `2^height-1`

```c++
class Solution {
public:
    int countNodes(TreeNode* root) {
        if(root==nullptr) return 0;
        TreeNode* left = root->left;
        TreeNode* right= root->right;
        int leftheight = 1;
        int rightheight = 1;
        while(left){
            left= left->left;
            leftheight++;
        }
        while(right){
            right = right->right;
            rightheight++;
        }
        if(leftheight == rightheight){
            return pow(2,leftheight)-1;
        }
        return  1 + countNodes(root->left) + countNodes(root->right);
    }
};
```

# [257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)///前序+回溯(最简单的回溯)

```c++
class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> ans;
        vector<int> path;
        traverse(root, path, ans);
        return ans;
    }
    void traverse(TreeNode* root, vector<int>& path, vector<string>& ans){
        path.push_back(root->val);
        if(root->left==nullptr && root->right==nullptr){
            string tmp="";
            for(int i=0;i < path.size()-1;i++){
                tmp = tmp + to_string(path[i]);
                tmp = tmp + "->";
            }
            tmp += to_string(path[path.size()-1]);
            ans.push_back(tmp);
        }
        if(root->left){
            traverse(root->left,path,ans);
            path.pop_back();///递归完，要做回溯///递归和回溯始终在一起
        }
        if(root->right){
            traverse(root->right,path,ans);
            path.pop_back();
        }
    }
};
```

# [404. 左叶子之和](https://leetcode-cn.com/problems/sum-of-left-leaves/)//左叶子要有定义

```c++
class Solution {
public:
    int sumOfLeftLeaves(TreeNode* root) {
        return traverse(root);
    }
    int traverse(TreeNode* root){
        if(root==nullptr) return 0;       
        int leftnum = traverse(root->left);
        int rightnum = traverse(root->right);
        int tmp = 0;
        if(root->left && !root->left->left && !root->left->right){
            tmp = root->left->val ;
        }///tmp默认为0，不然是左节点的话再存入
        return tmp + leftnum + rightnum;
    }
};
```

# [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

给定一个不含重复元素的整数数组 nums 。一个以此数组直接递归构建的 最大二叉树 定义如下：

二叉树的根是数组 nums 中的最大元素。
左子树是通过数组中 最大值左边部分 递归构造出的最大二叉树。
右子树是通过数组中 最大值右边部分 递归构造出的最大二叉树。
返回有给定数组 nums 构建的 最大二叉树 。

```c++
class Solution {
public:
    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        return traversal(nums, 0, nums.size());
    }
    TreeNode* traversal(vector<int>& nums, int left, int right){
        if(left >= right) return nullptr;
        int index = left;
        for(int i=left; i<right;i++){
            if(nums[i]>nums[index]){
                index = i;
            }       
        }
        TreeNode* root = new TreeNode(nums[index]);
        root->left = traversal(nums, left, index);
        root->right= traversal(nums,index+1, right);
        return root;
    }
};
```

