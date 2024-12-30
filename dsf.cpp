#include <iostream>

using namespace std;

struct Node{
    int value;
    Node* left;
    Node* right;    
};

void dfs(Node* root) {
    if(root == NULL) {
        return;
    }

    cout << root->value << "  ";
    dfs(root->left);
    dfs(root->right);
}

int main() {

    Node *root = new Node();
    root->value = 10;
    root->left = new Node();
    root->left->value = 20;
    root->right = new Node();
    root->right->value = 30;

    cout << root->value << endl;
    cout << root->left->value << endl;
    cout << root->right->value << endl;

    dfs(root);

    return 0;

}