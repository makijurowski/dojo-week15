using System; 
using System.Collections;
using System.Collections.Generic;

namespace csharp 
{
    public class BinarySearchTree
    {
        public Node root;
        public int size = 0;

        public BinarySearchTree() 
        {
            Node root = null;
        }

        public void addNode(int val)
        {
            Node newNode = new Node(val);
            this.size++;
            newNode.displayNode();
            if (root == null)
            {
                root = newNode;
            }
            else
            {
                Node current = root;
                Node parent;
                while (true)
                {
                    parent = current;
                    if (val < current.val)
                    {
                        current = current.left;
                        if (current == null)
                        {
                            parent.left = newNode;
                            break;
                        }
                    }
                    else
                    {
                        current = current.right;
                        if (current == null)
                        {
                            parent.right = newNode;
                            break;
                        }
                    }
                }
            }
        }

        public bool contains(int num, Node current)
        {
            if (this.root == null)
            {
                return false;
            }

            while (current != null)
            {
                if (current.val == num)
                {
                    return true;
                }
                else if (num < current.val)
                {
                    return contains(num, current.left);
                }
                else if (num > current.val)
                {
                    return contains(num, current.right);
                }
                else 
                {
                    return false;
                }
            }
            return false;
        }
    }

    public class Node
    {
        public int val;
        public Node left;
        public Node right;

        public Node(int num)
        {
            val = num;
            left = null;
            right = null;
        }
        public void displayNode()
        {
            System.Console.WriteLine("Node val: " + val);
        }
    }
}