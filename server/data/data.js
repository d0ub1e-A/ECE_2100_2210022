export const data = [
  {
    title: "algo",
    note: "# Selection sort:\n\n```\nlet list = [5, 3, 2, 1, 4];\n\nfor(let i = 0; i < list.length; i++) {\n  let j = 0;\n}\n```",
    tag: "untagged",
    created_at: "2025-05-25T07:47:06.711Z"
  },
  {
    title: "selector in javascript",
    note: "# Initialization Methods From document\n\n- `document.querySelector('.class-name')`: This will pick up only the first matched element by class name. It also supports selectors like `> children-element`\n\n- `document.querySelector('#id-name')`: This will pick up the matched element by id name. It also supports selectors like `> children-element`\n\n- `document.querySelectorAll('.class-name')`: This will pick up all the matched elements by class name\n\n- `document.getElementById('id-name')`: This will pick up the matched element by id name. It also supports selectors like `> children-element`\n\n- `document.getElementsByTagName('name-tag')`: This will pick up all the matched elements by name tag but does not support selectors like `> p`",
    tag: "JS",
    created_at: "2025-05-30T17:32:05.587Z"
  },
  {
    created_at: "2025-06-03T15:42:48.078Z",
    note: '# OOP Theoretical Concepts\n\n## Class\n- Complex + user defined data types\n- Used for setting a blueprint for different properties of that data type\n\n## Access modifiers (am)\n- Declares the accessibility of properties. They are three types:\n\n  1. private: properties under private "am" cannot be accessed outside the class.\n  2. public: properties under public "am" can be accessed outside the class.\n  3. protected: Almost like "private". But can be accesed through inherited class.\n\n## Constructors:\n- These are special types of functions which are automatically created after creating an object.\n- Default constructor is erased when a custom constructor (parameterized or copy) is declared.\n\n## Encapsulation:\n- Prevents data inside of any class to be directly modified.\n\n## Abstraction:\n- Hiding complex structures into simple things.',
    tag: "cpp",
    title: "OOP"
  },
  {
    created_at: "2025-06-03T15:44:20.581Z",
    note: "# Standard Template Library\n\n## Containers\n\n### Sequential\n\n- vector:\n1. `push_back()` + `pop_back()` time complexity: O(1)\n2. `.size()` time complexity: O(1)\n3. initail filling: `vector<int> v(5, 9);` first number -> size, then filling number\n4. copiying (`vector<int> v2 = v1`) time complexity O(n)\n- stack:\n- queue:\n- pair (not a container):\n\n### Ordered\n\n- Maps:\n1. Every value is a {key, value} pair\n2. Not continuous\n3. Store data in sorted order (sorted keys)\n4. Insertion time complexity -> O(log(n)) because it inserts 0 or empty string as initial value. So just creating a pair consumes O(log(n))\n5. Keys must be unique. Else will be overrided with the latest value\n6. If no matched key found in `.find()` method run on a map, then `.end()` is returned\n7. `mapName.clear()` clears the map & make it a 0 sized map\n- Multimap:\n- Set:\n- Multiset:\n\n### Un-ordered\n\n- Unordered map:\n- Unordered set:\n\n## Iterators\n\n> Point to memory adresses of containers like : `.begin()`, `.end()`.\n\n1. `.end()` iterator points the position after the last element\n2. `auto` keyword detects data type automatically\n\n**Syntax:** `vector<int>::iterator it;`\n\n## Algorithms\n\n- upper bound:\n- lower bound:\n- sort (comparator):\n- max_element:\n- min_element:\n- accumulate:\n- reverse:\n- count:\n- find:\n- next permutations:\n- previous permutations:\n\n## Funtors\n\n> **Classes which can act as functions**",
    tag: "cpp",
    title: "STL"
  },
  {
    created_at: "2025-06-03T15:48:58.329Z",
    note: "**Following is an example of strtok(a char type array, \"characters to be excluded\") function**\n\n### Using C:\n\n```C\n#include<stdio.h>\n#include<string.h>\n\nint main()\n{\n    char string[] = \"Hey, this is for an example\";\n    char *word;\n    \n    word = strtok(string, \"`~!$%^&*()_-+={}[]|\\:;\\\"<,>.?/ \"); // take only the first word\n      \n    // this loop will filter out every word excluding those characters\n    while(word != NULL) { \n        if(strlen(word) > 0) { // can do whatever is needed }\n    \n        word = strtok(NULL, \"`~!$%^&*()_-+={}[]|\\:;\\\"<,>.?/ \");\n    }\n}\n```\n\n### Using C++:\n\n```CPP\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main()\n{\n    string str = \"{Hello}, (world)! Welc'ome to ! .strtok\";\n    str.push_back('.');\n    string delimiters = \" ,!.{}()\";\n\n    size_t start = 0;\n    size_t end = str.find_first_of(delimiters, 0);\n\n    while (end != /* (str.length() - 1) */string::npos) {\n        if (end != start) {\n            cout << \"Token: \" << str.substr(start, end - start) << endl;\n        }\n        start = end + 1;\n        end = str.find_first_of(delimiters, start);\n    }\n\n    // Following section can be used if null character prevails at the end of a string\n    /*if (start != str.length()) {\n        cout << \"Token: \" << str.substr(start) << endl;\n    }*/ \n}\n```",
    tag: "cpp",
    title: "String Tokenization"
  },
  {
    created_at: "2025-06-03T15:51:49.422Z",
    note: "# Unique Sorting\n\n``` CPP\nvector</*vector type*/> anArray;\n\nfor(int i = 0; i < anArray.size(); i++) {\n\n  for(int j = i + 1; j < anArray.size(); j++) {\n\n    if(anArray[i] == anArray[j]) {\n\n\t\t\tanArray.erase(anArray.begin() + j);\n\t\t\tj = i;\n\t\t}\n\t}\n}\n```",
    tag: "cpp",
    title: "Unique Sorting"
  }
];