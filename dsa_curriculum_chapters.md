# DSA Curriculum: Beginner to Intermediate Level 2

This document provides a structured list of all chapters and lessons from **Fundamentals** up to **Intermediate DSA Level 2**, compiled from the project curriculum.

---

## 1. Fundamentals (C++)
*Foundational building blocks of programming and memory structure.*

### Getting Started
* Introduction to Programming
* Installing Compiler & IDE
* Writing Your First Program
* Input & Output
* Comments
* Variables
* Data Types
* Namespaces & std
* Operators
* Expressions

### Control Flow
* if / if else / Nested if
* Switch
* Loops
* Break / Continue
* goto (Introduction)

### Functions
* Functions, Parameters, and Return Types
* Function Overloading
* Inline Functions
* Default Arguments
* Recursion Basics

### Arrays & Strings
* Arrays & Multidimensional Arrays
* Character Arrays & Strings
* String Library

### Pointers
* Memory & Address Operator
* Pointers & Pointer Arithmetic
* Double Pointers
* Function Pointers

### Dynamic Memory
* Stack vs Heap
* `new` and `delete`
* Memory Leaks

### OOP (Object Oriented Programming)
* Classes & Objects
* Constructors & Destructor
* Encapsulation, Inheritance, Polymorphism, and Abstraction
* Virtual Functions

### Templates
* Function Templates
* Class Templates

### Exception Handling
* Exception Handling

### File Handling
* File Handling

### STL (Standard Template Library)
* vector, pair, deque, list
* stack, queue, priority_queue
* set, multiset, unordered_set
* map, unordered_map
* algorithms & iterators
* lambda expressions

---

## 2. Beginner DSA
*Mathematical foundations and essential elementary algorithms.*

### Mathematical Foundations & Arrays
* **Math Basics Part 1**
  * Working with Digits (Sum of Digits, Armstrong Numbers, Palindrome Numbers)
  * Modulo Arithmetic
  * Divisors & Prime Numbers
* **Math Basics Part 2 (GCD & LCM)**
  * Greatest Common Divisor (GCD) / HCF
  * Least Common Multiple (LCM)
* **Array Fundamentals & Largest Element**
  * Memory Allocation & Direct Indexing
  * Finding Largest Element
* **Finding the Second Largest Element**
  * Brute-Force vs. Better vs. Optimal ($O(n)$ time, $O(1)$ space)
* **Max Consecutive Ones & Missing Number**
  * Maximum Consecutive 1's
  * Finding Missing Number
* **Sorted Array Checks & Removing Duplicates**
  * Checking if Array is Sorted
  * Removing Duplicates from Sorted Array (Two-pointer in-place technique)
* **Moving Zeros to the End**
  * Brute-Force vs. Two-pointer in-place relative swapping
* **Zero Fill Matrix (Set Matrix Zeroes)**
  * Row and column tracking arrays
* **Spiral Matrix Traversal**
  * Four-Boundary Strategy (top, bottom, left, right)
* **Majority Element**
  * Goal: Find the element in an array of size $N$ that appears more than $\lfloor N/2 \rfloor$ times.
  * Brute-Force vs. Hash Map vs. Boyer-Moore Voting Algorithm.
  * Boyer-Moore Strategy: Pairwise cancellation using candidate and count ($O(N)$ time, $O(1)$ space).
* **Rotate Array**
  * Goal: Rotate an array to the right by $k$ steps.
  * Approaches: Extra Array, Three-Reversal Method ($O(1)$ space), Cyclic Replacement, and STL `rotate()`.
* **Best Time to Buy and Sell Stock**
  * Goal: Find the maximum profit from buying and selling a stock on different days.
  * Pattern: Prefix Minimum / Running Minimum ($O(N)$ time, $O(1)$ space).
* **Best Time to Buy and Sell Stock II**
  * Goal: Find the maximum profit with multiple transactions allowed (buy/sell multiple times).
  * Strategy: Accumulate all positive price differences from consecutive days ($O(N)$ time, $O(1)$ space).

### Strings
* **Valid Anagram**
  * Goal: Determine if two strings contain the exact same characters with the same frequencies.
  * Brute-Force (Sorting): Sort both strings and compare ($O(n \log n)$ time, $O(1)$ space).
  * Optimal (Frequency Array): Count character frequencies using a fixed array of size 26 ($O(n)$ time, $O(1)$ space).
* **Reverse Words in a String**
  * Goal: Reverse the order of words in a string while removing extra spaces.
  * Two-Pointer / Stack Approach: Isolate words, push onto a stack, and reconstruct the string in reverse ($O(n)$ time, $O(n)$ space).
  * In-Place Reversal: Clean spaces $\rightarrow$ reverse the entire string $\rightarrow$ reverse each individual word ($O(n)$ time, $O(1)$ space).
* **Construct K Palindrome Strings**
  * Goal: Check if string s can be partitioned into k non-empty palindromic strings.
  * Key Conditions: If `s.length() < k`, impossible ($\rightarrow$ false). Count character frequencies with odd counts (`oddCount`). If `oddCount <= k`, possible ($\rightarrow$ true), else impossible ($O(n)$ time, $O(1)$ space).

### Recursion & Backtracking
* **Understanding Recursion**
  * Definition: A function calling itself to solve smaller subproblems.
  * Essential Components: Base Case (stopping condition to prevent stack overflow), Recursive Case, and Call Stack (LIFO stack frames).
* **Printing 1 to N and N to 1 Using Recursion**
  * 1 to N: Incremental calls ($i + 1$), print before recursive step ($O(n)$ time, $O(n)$ stack space).
  * N to 1: Decremental calls ($i - 1$), print before recursive step ($O(n)$ time, $O(n)$ stack space).
* **Sum of N & Factorial Using Recursion**
  * Sum of N: Recurrence relation $\text{sum}(n) = n + \text{sum}(n - 1)$ with base case $n = 1$.
  * Factorial: Recurrence relation $\text{factorial}(n) = n \times \text{factorial}(n - 1)$ with base case $n = 0$ or $1$.
  * Complexities: $O(n)$ time, $O(n)$ stack space.
* **Reversing an Array & Checking Palindromes Using Recursion**
  * Reverse Array: Two-pointer recursive swapping of $i$-th and $(n - i - 1)$-th elements until $i \geq n/2$.
  * Check String Palindrome: Compare `str[i]` with `str[n - i - 1]`. Return false on mismatch, true when $i \geq n/2$.
  * Complexities: $O(n)$ time, $O(n)$ stack space.
* **Fibonacci Series Using Recursion**
  * Recurrence Relation: $F(n) = F(n - 1) + F(n - 2)$ with base cases $F(0) = 0, F(1) = 1$.
  * Multiple / Tree Recursion: Makes two recursive calls per step, forming a binary recursion tree.
  * Complexities: $O(2^n)$ exponential time, $O(n)$ space depth.
* **Backtracking: Printing All Subsequences**
  * Goal: Generate all $2^n$ possible subsequences using recursion.
  * Pick / Non-Pick Pattern: At index $i$, branch into two decisions (Pick: Include `arr[i]`, Not Pick: Exclude `arr[i]`).
  * Complexities: $O(2^n \times n)$ time, $O(n)$ stack space.
* **Backtracking: Unique Subsets (Subsets II)**
  * Goal: Generate all unique subsets from an array containing duplicate numbers.
  * Strategy: Sort array first to group duplicates, skip identical choices at the same recursion depth using `if (i != index && nums[i] == nums[i - 1]) continue;`.
  * Flow: Include element $\rightarrow$ Recurse $\rightarrow$ Backtrack (pop_back).
  * Complexities: $O(2^n \times n)$ time, $O(n)$ auxiliary stack space.
* **Backtracking: Purchase Combinations (Combination Sum)**
  * Goal: Find all unique combinations summing to a target budget where elements can be reused indefinitely.
  * Strategy: Keep track of remaining budget and start index. Pass $i$ (not $i + 1$) to allow element reuse without duplicate permutations.
  * Pruning: Stop path immediately if `remain < 0`.

### Sorting
* **Selection Sort**
  * Core Idea: Repeatedly find the minimum element from the unsorted portion of the array and swap it with the first element of that unsorted section.
  * Mechanism: Outer loop tracks sorted boundary (`i = 0` to `n - 2`); inner loop scans remainder (`j = i + 1` to `n - 1`) to find `minIdx`; swap `arr[i]` with `arr[minIdx]`.
  * Complexities: $O(N^2)$ time (Best, Average, Worst), $O(1)$ space (In-place).
* **Bubble Sort**
  * Core Idea: Repeatedly compare adjacent elements and swap them if they are in the wrong order. Largest unsorted element "bubbles up" to the end.
  * Mechanism: Compare adjacent `arr[j]` and `arr[j + 1]`, swap if out of order. Optimize with a boolean flag (`swapped`) to terminate early if a pass completes without swaps.
  * Complexities: Time $O(N)$ Best (already sorted), $O(N^2)$ Average/Worst; Space $O(1)$ (In-place).
* **Insertion Sort**
  * Core Idea: Divide the array into sorted and unsorted parts. Pick elements from the unsorted part and insert them into their correct position by shifting larger elements to the right.
  * Mechanism: Treat index 0 as sorted. Loop `i` from 1 to `n - 1`. Compare `key = arr[i]` with sorted elements right-to-left. Shift larger elements right.
  * Complexities: Time $O(N)$ Best (already sorted), $O(N^2)$ Average/Worst; Space $O(1)$ (In-place).
* **Merge Sort**
  * Core Idea: A Divide and Conquer algorithm that recursively splits the array into two halves, sorts them independently, and merges the sorted halves back together.
  * Mechanism: Divide array at `mid` until size is 1; recursively sort left/right sub-arrays; merge the sorted halves using a temporary array.
  * Complexities: Time $O(N \log N)$ (Best, Average, Worst); Space $O(N)$ auxiliary space + $O(\log N)$ stack depth.
* **Quick Sort**
  * Core Idea: A Divide and Conquer algorithm that picks a pivot element, partitions the array around the pivot (smaller to the left, larger to the right), and recursively sorts the sub-arrays.
  * Mechanism: Pick pivot (first, last, random, or middle); partition array around pivot; recursively apply Quick Sort to left and right partitions.
  * Complexities: Time $O(N \log N)$ (Best, Average), $O(N^2)$ Worst (unbalanced splits); Space $O(\log N)$ average call stack space.

### Searching
* **Introduction to Searching & Linear Search**
  * Linear Search: Checks each element sequentially from start to end until target is found or end of array is reached. Works on both sorted and unsorted arrays.
  * Binary Search Basics: Optimized divide-and-conquer strategy that repeatedly cuts the search space in half. Requires the array to be sorted.
  * Complexities: Linear Search Time: Best $O(1)$, Worst $O(N)$; Space $O(1)$.
* **Lower Bound & Upper Bound**
  * Lower Bound: Smallest index $i$ such that $\text{arr}[i] \ge x$. If $\text{arr}[\text{mid}] \ge x$, record `ans = mid` and move left (`high = mid - 1`); otherwise, move right (`low = mid + 1`).
  * Upper Bound: Smallest index $i$ such that $\text{arr}[i] > x$. If $\text{arr}[\text{mid}] > x$, record `ans = mid` and move left (`high = mid - 1`); otherwise, move right (`low = mid + 1`).
  * Complexities: Time $O(\log N)$, Space $O(1)$.
* **Search in Rotated Sorted Array**
  * Core Concept: In a rotated sorted array, picking any mid will always leave at least one half (left or right) completely sorted.
  * Strategy: Identify which half is sorted by comparing boundary elements. Check if the target $k$ falls within the sorted half's range. Narrow down search space accordingly.
  * Complexities: Time $O(\log N)$, Space $O(1)$.
* **Finding Peak Element**
  * Definition: A peak element is strictly greater than its neighbors ($\text{arr}[i] > \text{arr}[i-1]$ and $\text{arr}[i] > \text{arr}[i+1]$).
  * Strategy: Handle edge cases. Perform binary search in range $[1, n-2]$. If $\text{arr}[\text{mid}]$ is on increasing slope, peak lies right; if on decreasing slope, peak lies left.
  * Complexities: Time $O(\log N)$, Space $O(1)$.
* **Finding Nth Root of M ($\sqrt[N]{M}$)**
  * Goal: Find an integer $x$ such that $x^N = M$, or return -1 if $x$ is not an integer.
  * Search Space: $[1, M]$. Use binary search: if $\text{mid}^N == M$, return `mid`; if less, search right; if greater, search left. Use early break during multiplication to prevent integer overflow.
  * Complexities: Time $O(N \log M)$, Space $O(1)$.

### Bit Manipulation
* **Binary Operations**
  * Core Concepts: Binary numbers (base-2), LSB, MSB.
  * Conversions & Arithmetic: Decimal to Binary (division-by-2) & Binary to Decimal (positional weight).
  * Sign Representations: 1's Complement (invert all bits) & 2's Complement ($\text{1's Complement} + 1$, used for negatives).
* **Code for Binary Conversion**
  * Decimal to Binary: String building via modulo-2 and integer division ($O(\log n)$ time, $O(\log n)$ space).
  * Binary to Decimal: Positional weight accumulation ($O(n)$ time, $O(1)$ space).
* **Bitwise Operators**
  * Operators: AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), Left Shift (`<<`, multiplies by $2^n$), Right Shift (`>>`, divides by $2^n$).
  * Limits: `INT_MAX` ($2^{31} - 1$), `INT_MIN` ($-2^{31}$).
* **Bit Manipulation Techniques 1**
  * Check $i$-th bit is set: `(N & (1 << i)) != 0`
  * Set $i$-th bit: `N = (N | (1 << i))`
  * Clear $i$-th bit: `N = (N & ~(1 << i))`
  * Toggle $i$-th bit: `N = (N ^ (1 << i))`
* **Bit Manipulation Techniques 2**
  * Swap two numbers: `a = a ^ b; b = a ^ b; a = a ^ b;`
  * Remove rightmost set bit: `N & (N - 1)`
  * Check if power of 2: `(N > 0) && ((N & (N - 1)) == 0)`
  * Count set bits (Brian Kernighan's Algorithm): `N = N & (N - 1)` loop ($O(\text{number of set bits})$ time, $O(1)$ space).
* **Minimum Bit Flips to Convert a Number**
  * Strategy: Compute `n = source ^ target` to isolate differing bits, then count set bits in `n` ($O(k)$ time, $O(1)$ space).
* **Single Element 1**
  * Goal: Find unique element in array where all other elements appear twice.
  * Strategy: XOR all elements together; duplicate pairs cancel out ($x \oplus x = 0$) leaving the unique element ($O(n)$ time, $O(1)$ space).
* **Min Bit Flips for OR Operation**
  * Goal: Find min flips so $(x \mid y) == z$.
  * Strategy: Bit-by-bit check from LSB to MSB. If $z_i == 0$, flip both if set. If $z_i == 1$ and both are $0$, flip one.
* **Bitwise XOR For a Given Range**
  * Goal: Find XOR sum from `left` to `right` in $O(1)$ time.
  * Strategy: XOR sum $1 \dots n$ follows a modulo 4 repeating pattern. $\text{xorRange}(\text{left}, \text{right}) = \text{xorOnetoN}(\text{right}) \oplus \text{xorOnetoN}(\text{left} - 1)$.
  * Complexities: $O(1)$ time, $O(1)$ space.

---

## 3. Intermediate DSA Level 1
*Core intermediate data structures and traversal strategies.*

### Hashing
* **Introduction to Hashing**
  * Problem Statement: Search speed comparison (Linear Search $O(N)$ vs. Binary Search $O(\log N)$) and the goal of $O(1)$ constant time lookup.
  * Direct Address Table: Using data values directly as array indices and the disadvantage of massive memory waste.
  * Key Space, Hash Table, and Hash Function (using `key % 10` as a simple sample).
  * Concept of Collisions: When multiple keys map to the exact same hash table index.
* **Collision Resolution Techniques**
  * Open Hashing (Chaining): Using linked lists at each table slot to store colliding elements.
  * Closed Hashing (Open Addressing): Finding alternate empty slots within the table itself.
    * Linear Probing: Searching slots sequentially ($Hash(x) + i \pmod N$).
    * Quadratic Probing: Searching slots using quadratic steps ($Hash(x) + i^2 \pmod N$).
    * Double Hashing: Using a second hash function to calculate probing steps ($Hash_1(x) + i \times Hash_2(x) \pmod N$).
  * Advantages & Disadvantages of each collision resolution strategy.

### Prefix Sum
* Introduction to Prefix Sum
* In-Place Prefix Sum

### Sliding Window & Two Pointer Technique
* Introduction to Sliding Window
* Introduction to Two Pointer Technique

### Linked Lists
* Lesson 1: Introduction to Linked Lists
* Lesson 2: Insertion in Singly Linked List
* Lesson 3: Deletion in Singly Linked List
* Lesson 4: Introduction to Doubly Linked Lists
* Lesson 5: Insertion in Doubly Linked List
* Lesson 6: Deletion in Doubly Linked List
* Lesson 7: Circular Linked Lists
* Lesson 8: Reverse a Linked List
* Lesson 9: Cycle in Linked List
* Lesson 10: Flatten a Linked List
  * Goal: Flatten a multi-level linked list where each node has a `next` pointer and a `child`/`bottom` pointer into a single-level sorted list.
  * Strategy: Recursively merge lists from right to left using the merge logic of Merge Sort.
  * Complexities: Time: $O(N \times M)$ where $N$ is the number of main nodes and $M$ is the average number of child nodes; Space: $O(N)$ recursion stack space.

### Stacks
* **Introduction to Stack**
  * Core Concept: LIFO (Last In First Out) behavior, operations (push, pop, peek, isEmpty).
* **Stack Implementation using Array**
  * Memory limits: Overflow and underflow conditions, `top` index tracking.
* **Stack Implementation using Linked List**
  * Dynamic memory structure: Inserting at head for constant time $O(1)$ updates.
* **Introduction to Monotonic Stack**
  * Monotonic behavior: Stacks that maintain elements in strictly increasing or decreasing order.
* **Next Greater Element**
  * Optimal solution: Right-to-left scan with a monotonic stack ($O(N)$ time, $O(N)$ space).
* **Infix, Prefix, and Postfix Notation**
  * Expressions: Conversion and evaluation logic using stack operators and operands.
* **Min Stack**
  * Goal: Design a stack that supports retrieving the minimum element in $O(1)$ constant time.
  * Strategy: Use an auxiliary stack to trace minimum values.
* **Valid Parentheses**
  * Goal: Check if input bracket sequences are balanced.
  * Strategy: Push openers, pop and check matches on closers ($O(N)$ time, $O(N)$ space).
* **Asteroid Collision**
  * Goal: Simulate asteroid collisions where signs denote directions.
  * Strategy: Pop smaller right-moving asteroids when collided by left-moving ones.
* **Largest Rectangle in Histogram**
  * Goal: Find the maximum rectangular area in a bar histogram.
  * Strategy: Monotonic stack boundary sweep ($O(N)$ time, $O(N)$ space).


### Queues
* *No additional sub-lessons defined yet.*

### Trees & Binary Search Trees (BST)
* *No additional sub-lessons defined yet.*

### Heaps
* *No additional sub-lessons defined yet.*

---

## 4. Intermediate DSA Level 2
*Advanced optimization models, state transition algorithms, and graph traversals.*

### Greedy
* Introduction to Greedy

### Dynamic Programming Part 1
* Dynamic Programming Introduction
* Climbing Stairs
* Frog Jump
* House Robber 1
* Unique Paths 1
* Maximum Path Sum

### Dynamic Programming Part 2
* Subset Sum Problem
* Partition Equal Subset Sum
* Count Subsets with Target
* Unbounded Knapsack
* Longest Common Subsequence
* Longest Palindromic Subsequence
* Stock Trading 2 & 3

### Graph Part 1
* Introduction to Graphs & Graph Representation
* BFS (Breadth-First Search) & DFS (Depth-First Search)
* Number of Provinces & Number of Islands
* Cycle Detection in Undirected Graph (BFS & DFS)
* Bipartite Graph (BFS & DFS)
* Cycle Detection in a Directed Graph
* Topological Sort & Kahn's Algorithm
* Cycle Detection in Directed Graph using Kahn's Algorithm

### Graph Part 2
* Dijkstra's Algorithm
* Bellman-Ford Algorithm
* Floyd-Warshall Algorithm
* Minimum Spanning Tree (Prim's & Kruskal's Algorithms)
* Disjoint Sets & Code Implementation
* Strongly Connected Components
* Articulation Points
