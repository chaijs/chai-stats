chai-stats
==========

Statistical and additional numerical assertions for the Chai Assertion Library.

When this plugin is loaded, numbers and objects can be tested for "almostEqual" and "deepAlmostEqual", such as:

   <code>assert.deepAlmostEqual({pi: 3.1416}, {pi: 3.14159}, 4);</code>

which checks to make sure the numbers are equal rounded to within 4 decimal places of precision.
