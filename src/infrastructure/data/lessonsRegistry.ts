import introToProgramming from "./lessons/fundamentals/intro-to-programming.json";
import installingIde from "./lessons/fundamentals/installing-ide.json";
import firstProgram from "./lessons/fundamentals/first-program.json";
import namespaces from "./lessons/fundamentals/namespaces.json";
import inputOutput from "./lessons/fundamentals/input-output.json";
import comments from "./lessons/fundamentals/comments.json";
import variables from "./lessons/fundamentals/variables.json";
import dataTypes from "./lessons/fundamentals/data-types.json";
import functions from "./lessons/fundamentals/functions.json";
import flattenALinkedList from "./lessons/intermediate-dsa-1/flatten-a-linked-list.json";
import introductionToHashing from "./lessons/intermediate-dsa-1/introduction-to-hashing.json";
import collisionResolutionTechniques from "./lessons/intermediate-dsa-1/collision-resolution-techniques.json";
import hashingKeyPropertiesAndTypes from "./lessons/intermediate-dsa-1/hashing-key-properties-and-types.json";
import majorityElement from "./lessons/beginner-dsa/majority-element.json";
import rotateArray from "./lessons/beginner-dsa/rotate-array.json";
import introductionToStack from "./lessons/intermediate-dsa-1/introduction-to-stack.json";
import stackImplementationUsingArray from "./lessons/intermediate-dsa-1/stack-implementation-using-array.json";
import stackImplementationUsingLinkedList from "./lessons/intermediate-dsa-1/stack-implementation-using-linked-list.json";
import introductionToMonotonicStack from "./lessons/intermediate-dsa-1/introduction-to-monotonic-stack.json";
import nextGreaterElement from "./lessons/intermediate-dsa-1/next-greater-element.json";
import infixPrefixPostfixNotation from "./lessons/intermediate-dsa-1/infix-prefix-postfix-notation.json";
import minStack from "./lessons/intermediate-dsa-1/min-stack.json";
import validParentheses from "./lessons/intermediate-dsa-1/valid-parentheses.json";
import asteroidCollision from "./lessons/intermediate-dsa-1/asteroid-collision.json";
import largestRectangleInHistogram from "./lessons/intermediate-dsa-1/largest-rectangle-in-histogram.json";
import bestTimeToBuyAndSellStock from "./lessons/beginner-dsa/best-time-to-buy-and-sell-stock.json";
import bestTimeToBuyAndSellStockII from "./lessons/beginner-dsa/best-time-to-buy-and-sell-stock-ii.json";
import introductionToPrefixSum from "./lessons/intermediate-dsa-1/introduction-to-prefix-sum.json";
import inPlacePrefixSum from "./lessons/intermediate-dsa-1/in-place-prefix-sum.json";
import rangeSumQuery from "./lessons/intermediate-dsa-1/range-sum-query.json";
import introductionToSlidingWindow from "./lessons/intermediate-dsa-1/introduction-to-sliding-window.json";
import introductionToTwoPointerTechnique from "./lessons/intermediate-dsa-1/introduction-to-two-pointer-technique.json";
import introductionToLinkedLists from "./lessons/intermediate-dsa-1/introduction-to-linked-lists.json";
import introductionToAlgorithms from "./lessons/beginner-dsa/introduction-to-algorithms.json";
import spaceAndTimeComplexity from "./lessons/beginner-dsa/space-and-time-complexity.json";
import asymptoticNotations from "./lessons/beginner-dsa/asymptotic-notations.json";
import countingSort from "./lessons/beginner-dsa/counting-sort.json";
import introductionToAvlTrees from "./lessons/intermediate-dsa-1/introduction-to-avl-trees.json";
import avlRotationsAndIntuition from "./lessons/intermediate-dsa-1/avl-rotations-and-intuition.json";
import avlTreeInsertion from "./lessons/intermediate-dsa-1/avl-tree-insertion.json";
import avlTreeDeletion from "./lessons/intermediate-dsa-1/avl-tree-deletion.json";
import avlTreeImplementation from "./lessons/intermediate-dsa-1/avl-tree-implementation.json";
import introToTree from "./lessons/intermediate-dsa-1/intro-to-tree.json";
import treeTraversals from "./lessons/intermediate-dsa-1/tree-traversals.json";
import levelorderTraversal from "./lessons/intermediate-dsa-1/levelorder-traversal.json";
import balancedBinaryTreeIntro from "./lessons/intermediate-dsa-1/balanced-binary-tree-intro.json";
import heightOfBinaryTree from "./lessons/intermediate-dsa-1/height-of-binary-tree.json";
import diameterOfBinaryTree from "./lessons/intermediate-dsa-1/diameter-of-binary-tree.json";
import maximumPathSum from "./lessons/intermediate-dsa-1/maximum-path-sum.json";
import treeViewsLca from "./lessons/intermediate-dsa-1/tree-views-lca.json";
import binarySearchTreeIntro from "./lessons/intermediate-dsa-1/binary-search-tree-intro.json";
import insertionDeletionBst from "./lessons/intermediate-dsa-1/insertion-deletion-bst.json";
import kthSmallestBst from "./lessons/intermediate-dsa-1/kth-smallest-bst.json";
import validateBst from "./lessons/intermediate-dsa-1/validate-bst.json";
import predecessorSuccessorBst from "./lessons/intermediate-dsa-1/predecessor-successor-bst.json";
import mergeTwoBsts from "./lessons/intermediate-dsa-1/merge-two-bsts.json";

export const lessonsRegistry: Record<string, any> = {
  "fundamentals/intro-to-programming": introToProgramming,
  "fundamentals/installing-ide": installingIde,
  "fundamentals/first-program": firstProgram,
  "fundamentals/namespaces": namespaces,
  "fundamentals/input-output": inputOutput,
  "fundamentals/comments": comments,
  "fundamentals/variables": variables,
  "fundamentals/data-types": dataTypes,
  "fundamentals/functions": functions,
  "intermediate-dsa-1/flatten-a-linked-list": flattenALinkedList,
  "intermediate-dsa-1/introduction-to-hashing": introductionToHashing,
  "intermediate-dsa-1/collision-resolution-techniques": collisionResolutionTechniques,
  "intermediate-dsa-1/hashing-key-properties-and-types": hashingKeyPropertiesAndTypes,
  "beginner-dsa/majority-element": majorityElement,
  "beginner-dsa/rotate-array": rotateArray,
  "intermediate-dsa-1/introduction-to-stack": introductionToStack,
  "intermediate-dsa-1/stack-implementation-using-array": stackImplementationUsingArray,
  "intermediate-dsa-1/stack-implementation-using-linked-list": stackImplementationUsingLinkedList,
  "intermediate-dsa-1/introduction-to-monotonic-stack": introductionToMonotonicStack,
  "intermediate-dsa-1/next-greater-element": nextGreaterElement,
  "intermediate-dsa-1/infix-prefix-postfix-notation": infixPrefixPostfixNotation,
  "intermediate-dsa-1/min-stack": minStack,
  "intermediate-dsa-1/valid-parentheses": validParentheses,
  "intermediate-dsa-1/asteroid-collision": asteroidCollision,
  "intermediate-dsa-1/largest-rectangle-in-histogram": largestRectangleInHistogram,
  "beginner-dsa/best-time-to-buy-and-sell-stock": bestTimeToBuyAndSellStock,
  "beginner-dsa/best-time-to-buy-and-sell-stock-ii": bestTimeToBuyAndSellStockII,
  "intermediate-dsa-1/introduction-to-prefix-sum": introductionToPrefixSum,
  "intermediate-dsa-1/in-place-prefix-sum": inPlacePrefixSum,
  "intermediate-dsa-1/range-sum-query": rangeSumQuery,
  "intermediate-dsa-1/introduction-to-sliding-window": introductionToSlidingWindow,
  "intermediate-dsa-1/introduction-to-two-pointer-technique": introductionToTwoPointerTechnique,
  "intermediate-dsa-1/introduction-to-linked-lists": introductionToLinkedLists,
  "beginner-dsa/introduction-to-algorithms": introductionToAlgorithms,
  "beginner-dsa/space-and-time-complexity": spaceAndTimeComplexity,
  "beginner-dsa/asymptotic-notations": asymptoticNotations,
  "beginner-dsa/counting-sort": countingSort,
  "intermediate-dsa-1/introduction-to-avl-trees": introductionToAvlTrees,
  "intermediate-dsa-1/avl-rotations-and-intuition": avlRotationsAndIntuition,
  "intermediate-dsa-1/avl-tree-insertion": avlTreeInsertion,
  "intermediate-dsa-1/avl-tree-deletion": avlTreeDeletion,
  "intermediate-dsa-1/avl-tree-implementation": avlTreeImplementation,
  "intermediate-dsa-1/intro-to-tree": introToTree,
  "intermediate-dsa-1/tree-traversals": treeTraversals,
  "intermediate-dsa-1/levelorder-traversal": levelorderTraversal,
  "intermediate-dsa-1/balanced-binary-tree-intro": balancedBinaryTreeIntro,
  "intermediate-dsa-1/height-of-binary-tree": heightOfBinaryTree,
  "intermediate-dsa-1/diameter-of-binary-tree": diameterOfBinaryTree,
  "intermediate-dsa-1/maximum-path-sum": maximumPathSum,
  "intermediate-dsa-1/tree-views-lca": treeViewsLca,
  "intermediate-dsa-1/binary-search-tree-intro": binarySearchTreeIntro,
  "intermediate-dsa-1/insertion-deletion-bst": insertionDeletionBst,
  "intermediate-dsa-1/kth-smallest-bst": kthSmallestBst,
  "intermediate-dsa-1/validate-bst": validateBst,
  "intermediate-dsa-1/predecessor-successor-bst": predecessorSuccessorBst,
  "intermediate-dsa-1/merge-two-bsts": mergeTwoBsts,
};
