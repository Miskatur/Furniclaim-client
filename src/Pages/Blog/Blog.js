import React from 'react';

const Blog = () => {
    return (
        <div className='lg:px-20 my-20 text-justify'>
            <h2 className='text-center text-5xl font-semibold my-5 text-secondary'>Frequently Asked Questions</h2>
            <div className='grid grid-cols-1'></div>
            <div className='border-2 rounded-lg p-5'>
                <h2 className='text-2xl bg-slate-500 text-secondary font-bold py-2 my-5'>
                    What are the different ways to manage a state in a React application?</h2>
                <div className='texl-lg font-semibold text-secondary'>
                    The Four Kinds of React State to Manage
                    <ul>
                        <li>Local state.</li>
                        <li>Global state.</li>
                        <li>Server state.</li>
                        <li>URL state.</li>
                    </ul>
                </div>
            </div>
            <div className='border-2 rounded-lg p-5 my-5'>
                <h2 className='text-2xl bg-slate-500 text-secondary font-bold py-2 my-5'>
                    How does prototypical inheritance work?</h2>
                <p className='texl-lg font-semibold text-secondary'>
                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                </p>
            </div>
            <div className='border-2 rounded-lg p-5'>
                <h2 className='text-2xl bg-slate-500 text-secondary font-bold py-2 my-5'>
                    What is a unit test? Why should we write unit tests?</h2>
                <p className='texl-lg font-semibold text-secondary'>
                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                </p>
            </div>
            <div className='border-2 rounded-lg p-5'>
                <h2 className='text-2xl bg-slate-500 text-secondary font-bold py-2 my-5'>
                    React vs. Angular vs. Vue?</h2>
                <p className='texl-lg font-semibold text-secondary'>
                    Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                </p>
            </div>

        </div>
    );
};

export default Blog;