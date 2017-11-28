using System;

namespace csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            BinarySearchTree newTree = new BinarySearchTree();
            newTree.addNode(5);
            newTree.addNode(3);
            newTree.addNode(7);
            System.Console.WriteLine(newTree.contains(7, newTree.root));
        }
    }
}