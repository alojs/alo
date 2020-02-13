# Introduction

My goal with alo always was to simplify state management and to improve reusability without requiring immutability. As of today, writing this article, its about 3 years ago since I developed the first couple versions of alo including v2.8.3. After releasing v2.8.3 and working with many alternative libraries, I started to realize several conceptual weaknesses and reached a dead end in its implementation, I had to rethink my strategy.

I write this introduction as a mix of history-article to share my past experience developing a state management library, and as conceptual-guide into alo. And by the way, please don't hang me for my bare-bones english :). 

My audience for this article is mostly frontend developers that already do state management in some form. But if something is very unclear, just ask me with a [Github Issue](https://github.com/alojs/alo/issues), I am open to extend the article also for a wider audience.

## TLDR

TODO:  Transactions!!! / Change-propagation

Reading about state management one mostly hears, that immutability is the best and only way to it, especially coupled with React where the performance of the application is directly depending on fast equality checks. While not often talked about there are alternatives and depending on your use case they might actually work better than the immutability approach. Everything summarized, I recommend a thinking of (Im)-mutability as tools for different jobs, instead of just following one paradigm like a religion.

While the state management in javascript is mostly filled with solutions based around immutability, I try to provide a library to fill the other gap. Not to replace existing solutions, but to broaden the way we think in our frontend work. Sorry for the "Please not again a new library"-camp :P

## Mutability and Immutability

Advantages of immutability:
- "Transactions": Since you don't mutate objects but rather create new ones, references to the old object don't autmatically get updated. This lets you control when, and how state changes are being propagated through your application
- "Equality checks": You can use equality checks "==" on object references. This is especially useful when combined with a object state tree, where after a change somewhere deep in the state, each parent object in the tree is recreated, allowing you to very fast compare state regarding deep changes without the need of recursive equality checks.
- "Easy undo,redo / time travel": Thanks to its characteristics it's comparatively easy and very efficient to implement undo, redo features in your application and gain access to devtools like time travel debugging.

Advantages of mutability:
- "Comes for free in the language": Most basic constructs in the language are based around mutability. So while experimenting and prototyping your mind stays more focused on the actual business-problem you're trying to solve, instead of always keeping an eye and making sure that your precious objects aren't mutated.
- "One way to do it": Goes hand in hand with the first argument. You don't have to think about if you gonna use some library, object destructuring, Object.freeze, Object.assign. Just use that mighty "=" :)
- "List change performance": Especially if your use case has to do with large lists and frequent item changes, mutability will serve you very well because it doesn't come with the overhead of recreating the whole array on every change. 

I recommend immutability-based state management for mid-large, team based projects where its important that state changes are only propagated at will. In such a scenario its wise to use something like [Redux](https://github.com/reduxjs/redux) and [Immer](https://github.com/immerjs/immer) to access the experience of a very large community.

For small-mid projects, performance-depending features and prototypes I recommend to spend atleast some time with mutability because it might 

## Why another library?

## Deepclone approach

## Command approach

## Event/Tagging approach

## Getter/Setter approach


