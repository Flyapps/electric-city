/**
 * ...
 * @author Danny Marcowitz
 */

var allLevels = {
    "levels": [
        {
            "id": 1,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "blue", "sourcePos": [0, 0], "targetPos": [4, 0]},
                {"color": "yellow", "sourcePos": [0, 1], "targetPos": [4, 1]},
                {"color": "cyan", "sourcePos": [0, 2], "targetPos": [4, 2]},
                {"color": "green", "sourcePos": [0, 3], "targetPos": [4, 3]},
                {"color": "red", "sourcePos": [0, 4], "targetPos": [4, 4]}
            ]
        },
		{
            "id": 2,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 0], "targetPos": [1, 3]},
                {"color": "blue", "sourcePos": [3, 4], "targetPos": [4, 0]},
                {"color": "red", "sourcePos": [3, 0], "targetPos": [0, 0]},
                {"color": "purple", "sourcePos": [4, 4], "targetPos": [4, 2]}
            ]
        },
        {
            "id": 3,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [2, 2], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [0, 1], "targetPos": [3, 0]},
                {"color": "red", "sourcePos": [1, 3], "targetPos": [4, 0]},
                {"color": "yellow", "sourcePos": [1, 1], "targetPos": [3, 2]}
            ]
        },
		{
            "id": 4,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [2, 1], "targetPos": [4, 0]},
                {"color": "blue", "sourcePos": [1, 0], "targetPos": [2, 2]},
                {"color": "red", "sourcePos": [3, 1], "targetPos": [0, 0]},
                {"color": "yellow", "sourcePos": [1, 3], "targetPos": [3, 2]}
            ]
        },
        {
            "id": 5,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 0], "targetPos": [3, 3]},
                {"color": "yellow", "sourcePos": [2, 4], "targetPos": [4, 1]},
                {"color": "red", "sourcePos": [0, 1], "targetPos": [1, 3]},
                {"color": "purple", "sourcePos": [1, 1], "targetPos": [1, 4]}
            ]
        },
        {
            "id": 6,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 3], "targetPos": [3, 2]},
                {"color": "yellow", "sourcePos": [2, 3], "targetPos": [4, 0]},
                {"color": "red", "sourcePos": [0, 4], "targetPos": [0, 0]},
                {"color": "purple", "sourcePos": [2, 1], "targetPos": [4, 4]}
            ]
        },
		        {
            "id": 7,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 4], "targetPos": [4, 3]},
                {"color": "blue", "sourcePos": [0, 4], "targetPos": [1, 3]},
                {"color": "red", "sourcePos": [3, 3], "targetPos": [4, 1]},
                {"color": "purple", "sourcePos": [1, 1], "targetPos": [4, 2]}
            ]
        },
        {
            "id": 8,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [2, 1], "targetPos": [4, 0]},
                {"color": "blue", "sourcePos": [3, 3], "targetPos": [1, 1]},
                {"color": "yellow", "sourcePos": [3, 0], "targetPos": [2, 2]}
            ]
        },
		        {
            "id": 9,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 4], "targetPos": [1, 2]},
                {"color": "blue", "sourcePos": [3, 3], "targetPos": [0, 0]},
                {"color": "red", "sourcePos": [4, 0], "targetPos": [0, 3]}
            ]
        },
        {
            "id": 10,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 4], "targetPos": [0, 0]},
                {"color": "gray", "sourcePos": [1, 3], "targetPos": [4, 2]},
                {"color": "red", "sourcePos": [4, 4], "targetPos": [3, 2]},
				{"color": "yellow", "sourcePos": [1, 2], "targetPos": [4, 0]}
            ]
        },
		        {
            "id": 11,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 1], "targetPos": [4, 3]},
                {"color": "blue", "sourcePos": [4, 0], "targetPos": [3, 1]},
                {"color": "red", "sourcePos": [1, 2], "targetPos": [0, 0]},
                {"color": "purple", "sourcePos": [1, 3], "targetPos": [4, 1]}
            ]
        },
        {
            "id": 12,
            "rows": 5,
            "columns": 5,
            "linkPairs": [
                {"color": "orange", "sourcePos": [2, 3], "targetPos": [0, 4]},
                {"color": "blue", "sourcePos": [1, 1], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [4, 0], "targetPos": [1, 2]},
                {"color": "purple", "sourcePos": [3, 1], "targetPos": [1, 4]}
            ]
        },
		        {
            "id": 13,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 1], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [3, 0], "targetPos": [5, 2]},
                {"color": "red", "sourcePos": [0, 2], "targetPos": [3, 1]},
                {"color": "yellow", "sourcePos": [0, 4], "targetPos": [4, 1]},
                {"color": "purple", "sourcePos": [1, 4], "targetPos": [0, 5]}
            ]
        },
        {
            "id": 14,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 3], "targetPos": [5, 5]},
                {"color": "blue", "sourcePos": [1, 4], "targetPos": [1, 0]},
                {"color": "gray", "sourcePos": [4, 1], "targetPos": [4, 3]},
                {"color": "yellow", "sourcePos": [5, 4], "targetPos": [4, 2]},
                {"color": "orange", "sourcePos": [2, 0], "targetPos": [1, 1]}
            ]
        },
        {
            "id": 15,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 3], "targetPos": [4, 1]},
                {"color": "orange", "sourcePos": [5, 1], "targetPos": [2, 1]},
                {"color": "red", "sourcePos": [4, 4], "targetPos": [4, 2]},
                {"color": "gray", "sourcePos": [3, 3], "targetPos": [1, 2]},
                {"color": "purple", "sourcePos": [2, 5], "targetPos": [5, 4]}
            ]
        },
		        {
            "id": 16,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [2, 0], "targetPos": [1, 1]},
                {"color": "gray", "sourcePos": [5, 2], "targetPos": [3, 2]},
                {"color": "cyan", "sourcePos": [4, 1], "targetPos": [4, 4]},
                {"color": "yellow", "sourcePos": [1, 2], "targetPos": [3, 3]},
                {"color": "purple", "sourcePos": [2, 1], "targetPos": [2, 4]}
            ]
        },
        {
            "id": 17,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 2], "targetPos": [3, 2]},
                {"color": "blue", "sourcePos": [0, 2], "targetPos": [2, 1]},
                {"color": "red", "sourcePos": [4, 4], "targetPos": [5, 3]},
                {"color": "gray", "sourcePos": [1, 1], "targetPos": [3, 3]},
                {"color": "yellow", "sourcePos": [3, 4], "targetPos": [5, 4]},
                {"color": "purple", "sourcePos": [2, 4], "targetPos": [0, 5]}
            ]
        },
		        {
            "id": 18,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 0], "targetPos": [5, 2]},
                {"color": "blue", "sourcePos": [3, 3], "targetPos": [1, 4]},
                {"color": "red", "sourcePos": [1, 0], "targetPos": [2, 1]},
                {"color": "orange", "sourcePos": [4, 4], "targetPos": [1, 3]},
                {"color": "purple", "sourcePos": [0, 5], "targetPos": [0, 2]}
            ]
        },
        {
            "id": 19,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 0], "targetPos": [0, 5]},
                {"color": "blue", "sourcePos": [3, 1], "targetPos": [5, 4]},
                {"color": "red", "sourcePos": [3, 0], "targetPos": [5, 5]},
                {"color": "yellow", "sourcePos": [4, 3], "targetPos": [4, 0]},
                {"color": "gray", "sourcePos": [0, 0], "targetPos": [0, 4]}
            ]
        },
		        {
            "id": 20,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 5], "targetPos": [3, 5]},
                {"color": "blue", "sourcePos": [1, 2], "targetPos": [3, 2]},
                {"color": "cyan", "sourcePos": [4, 0], "targetPos": [1, 3]},
                {"color": "red", "sourcePos": [2, 1], "targetPos": [3, 4]},
                {"color": "purple", "sourcePos": [0, 0], "targetPos": [4, 2]}
            ]
        },
        {
            "id": 21,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 0], "targetPos": [4, 2]},
                {"color": "yellow", "sourcePos": [2, 2], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [2, 0], "targetPos": [4, 3]},
                {"color": "purple", "sourcePos": [4, 1], "targetPos": [1, 0]}
            ]
        },
		        {
            "id": 22,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 4], "targetPos": [1, 5]},
                {"color": "blue", "sourcePos": [1, 1], "targetPos": [3, 2]},
                {"color": "orange", "sourcePos": [0, 5], "targetPos": [5, 5]},
                {"color": "red", "sourcePos": [2, 1], "targetPos": [3, 4]}
            ]
        },
        {
            "id": 23,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 1], "targetPos": [2, 4]},
                {"color": "blue", "sourcePos": [1, 1], "targetPos": [3, 1]},
                {"color": "red", "sourcePos": [0, 5], "targetPos": [3, 2]},
                {"color": "yellow", "sourcePos": [2, 2], "targetPos": [3, 0]},
                {"color": "purple", "sourcePos": [1, 4], "targetPos": [4, 0]}
            ]
        },
		{
            "id": 24,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 0], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [0, 2], "targetPos": [4, 1]},
                {"color": "red", "sourcePos": [4, 3], "targetPos": [1, 3]},
                {"color": "purple", "sourcePos": [1, 1], "targetPos": [1, 4]}
            ]
        },
        {
            "id": 25,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 1], "targetPos": [2, 4]},
                {"color": "blue", "sourcePos": [2, 2], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [0, 5], "targetPos": [5, 0]},
                {"color": "pink", "sourcePos": [4, 1], "targetPos": [1, 4]}
            ]
        },
        {
            "id": 26,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 0], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [3, 1], "targetPos": [1, 3]},
                {"color": "red", "sourcePos": [2, 5], "targetPos": [3, 0]},
                {"color": "yellow", "sourcePos": [2, 1], "targetPos": [3, 2]}
            ]
        },
        {
            "id": 31,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 3], "targetPos": [3, 5]},
                {"color": "blue", "sourcePos": [5, 1], "targetPos": [1, 4]},
                {"color": "red", "sourcePos": [1, 1], "targetPos": [5, 2]},
                {"color": "yellow", "sourcePos": [3, 2], "targetPos": [4, 4]},
                {"color": "purple", "sourcePos": [4, 3], "targetPos": [4, 5]}
            ]
        },
        {
            "id": 28,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "pink", "sourcePos": [5, 5], "targetPos": [4, 1]},
                {"color": "green", "sourcePos": [2, 0], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [1, 2], "targetPos": [1, 4]},
                {"color": "red", "sourcePos": [3, 1], "targetPos": [1, 5]},
                {"color": "purple", "sourcePos": [2, 5], "targetPos": [3, 2]}
            ]
        },
        {
            "id": 29,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 0], "targetPos": [3, 2]},
                {"color": "gray", "sourcePos": [5, 0], "targetPos": [2, 3]},
                {"color": "red", "sourcePos": [5, 5], "targetPos": [2, 2]},
                {"color": "pink", "sourcePos": [1, 4], "targetPos": [3, 3]}
            ]
        },
        {
            "id": 30,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 0], "targetPos": [2, 3]},
                {"color": "yellow", "sourcePos": [0, 0], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [5, 5], "targetPos": [2, 2]},
                {"color": "blue", "sourcePos": [3, 2], "targetPos": [4, 5]}
            ]
        },
        {
            "id": 27,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 2], "targetPos": [2, 2]},
                {"color": "blue", "sourcePos": [0, 2], "targetPos": [3, 2]},
                {"color": "gray", "sourcePos": [4, 5], "targetPos": [5, 3]},
                {"color": "red", "sourcePos": [1, 0], "targetPos": [1, 4]},
                {"color": "pink", "sourcePos": [3, 5], "targetPos": [3, 1]}
            ]
        },
        {
            "id": 32,
            "rows": 6,
            "columns": 6,
            "linkPairs": [
                {"color": "cyan", "sourcePos": [0, 0], "targetPos": [5, 5]},
                {"color": "gray", "sourcePos": [1, 5], "targetPos": [4, 5]},
                {"color": "orange", "sourcePos": [1, 4], "targetPos": [2, 2]},
                {"color": "purple", "sourcePos": [2, 5], "targetPos": [3, 2]}
            ]
        },
        {
            "id": 33,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 0], "targetPos": [2, 5]},
                {"color": "blue", "sourcePos": [2, 1], "targetPos": [4, 1]},
                {"color": "yellow", "sourcePos": [4, 4], "targetPos": [1, 2]},
                {"color": "red", "sourcePos": [2, 6], "targetPos": [1, 1]},
                {"color": "cyan", "sourcePos": [3, 5], "targetPos": [2, 2]},
                {"color": "pink", "sourcePos": [3, 2], "targetPos": [5, 1]}
            ]
        },
        {
            "id": 34,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [2, 3], "targetPos": [0, 0]},
                {"color": "blue", "sourcePos": [1, 1], "targetPos": [3, 4]},
                {"color": "cyan", "sourcePos": [5, 1], "targetPos": [6, 4]},
                {"color": "red", "sourcePos": [1, 5], "targetPos": [3, 0]},
                {"color": "yellow", "sourcePos": [6, 6], "targetPos": [0, 1]},
                {"color": "pink", "sourcePos": [6, 0], "targetPos": [6, 5]}
            ]
        },
        {
            "id": 35,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [6, 4], "targetPos": [0, 6]},
                {"color": "blue", "sourcePos": [4, 3], "targetPos": [5, 1]},
                {"color": "yellow", "sourcePos": [2, 2], "targetPos": [4, 0]},
                {"color": "red", "sourcePos": [2, 1], "targetPos": [3, 3]},
                {"color": "pink", "sourcePos": [1, 6], "targetPos": [6, 5]}
            ]
        },
        {
            "id": 36,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 4], "targetPos": [5, 0]},
                {"color": "blue", "sourcePos": [3, 0], "targetPos": [2, 2]},
                {"color": "yellow", "sourcePos": [5, 1], "targetPos": [2, 1]},
                {"color": "red", "sourcePos": [2, 0], "targetPos": [4, 6]},
                {"color": "pink", "sourcePos": [5, 6], "targetPos": [6, 0]}
            ]
        },
        {
            "id": 37,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 1], "targetPos": [3, 5]},
                {"color": "blue", "sourcePos": [3, 2], "targetPos": [0, 2]},
                {"color": "yellow", "sourcePos": [6, 5], "targetPos": [2, 1]},
                {"color": "red", "sourcePos": [1, 4], "targetPos": [5, 1]},
                {"color": "orange", "sourcePos": [6, 6], "targetPos": [5, 5]},
                {"color": "pink", "sourcePos": [0, 6], "targetPos": [4, 5]}
            ]
        },
        {
            "id": 38,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 5], "targetPos": [0, 6]},
                {"color": "blue", "sourcePos": [0, 2], "targetPos": [1, 4]},
                {"color": "yellow", "sourcePos": [4, 3], "targetPos": [1, 2]},
                {"color": "red", "sourcePos": [2, 2], "targetPos": [4, 5]},
                {"color": "pink", "sourcePos": [5, 1], "targetPos": [5, 5]}
            ]
        },
        {
            "id": 39,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 5], "targetPos": [0, 6]},
                {"color": "blue", "sourcePos": [0, 0], "targetPos": [5, 4]},
                {"color": "yellow", "sourcePos": [5, 1], "targetPos": [1, 4]},
                {"color": "red", "sourcePos": [4, 0], "targetPos": [5, 6]},
                {"color": "cyan", "sourcePos": [2, 1], "targetPos": [4, 1]},
                {"color": "pink", "sourcePos": [1, 3], "targetPos": [3, 1]}
            ]
        },
        {
            "id": 40,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 1], "targetPos": [4, 3]},
                {"color": "blue", "sourcePos": [5, 3], "targetPos": [5, 0]},
                {"color": "yellow", "sourcePos": [0, 6], "targetPos": [1, 3]},
                {"color": "red", "sourcePos": [5, 5], "targetPos": [0, 0]},
                {"color": "orange", "sourcePos": [5, 2], "targetPos": [1, 0]},
                {"color": "pink", "sourcePos": [3, 3], "targetPos": [1, 2]}
            ]
        },
        {
            "id": 41,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 3], "targetPos": [5, 1]},
                {"color": "blue", "sourcePos": [4, 4], "targetPos": [2, 2]},
                {"color": "yellow", "sourcePos": [2, 3], "targetPos": [4, 1]},
                {"color": "red", "sourcePos": [6, 4], "targetPos": [1, 6]},
                {"color": "cyan", "sourcePos": [2, 0], "targetPos": [2, 4]},
                {"color": "orange", "sourcePos": [2, 5], "targetPos": [0, 6]},
                {"color": "pink", "sourcePos": [3, 0], "targetPos": [6, 3]}
            ]
        },
        {
            "id": 42,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [1, 4], "targetPos": [4, 4]},
                {"color": "blue", "sourcePos": [4, 2], "targetPos": [3, 3]},
                {"color": "yellow", "sourcePos": [5, 5], "targetPos": [3, 4]},
                {"color": "red", "sourcePos": [1, 0], "targetPos": [2, 5]},
                {"color": "pink", "sourcePos": [0, 6], "targetPos": [3, 5]}
            ]
        },
        {
            "id": 43,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 2], "targetPos": [2, 5]},
                {"color": "cyan", "sourcePos": [6, 0], "targetPos": [1, 2]},
                {"color": "orange", "sourcePos": [2, 6], "targetPos": [1, 3]},
                {"color": "blue", "sourcePos": [3, 4], "targetPos": [4, 3]},
                {"color": "yellow", "sourcePos": [1, 5], "targetPos": [4, 2]},
                {"color": "red", "sourcePos": [1, 1], "targetPos": [5, 5]},
                {"color": "pink", "sourcePos": [6, 6], "targetPos": [3, 6]}
            ]
        },
        {
            "id": 44,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [5, 5], "targetPos": [6, 0]},
                {"color": "blue", "sourcePos": [3, 2], "targetPos": [2, 5]},
                {"color": "yellow", "sourcePos": [3, 5], "targetPos": [4, 2]},
                {"color": "red", "sourcePos": [0, 0], "targetPos": [2, 3]},
                {"color": "pink", "sourcePos": [6, 5], "targetPos": [2, 4]}
            ]
        },
        {
            "id": 45,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 6], "targetPos": [6, 0]},
                {"color": "blue", "sourcePos": [5, 0], "targetPos": [0, 5]},
                {"color": "yellow", "sourcePos": [3, 3], "targetPos": [4, 5]},
                {"color": "red", "sourcePos": [2, 4], "targetPos": [4, 2]},
                {"color": "orange", "sourcePos": [5, 2], "targetPos": [1, 2]},
                {"color": "pink", "sourcePos": [1, 3], "targetPos": [4, 4]}
            ]
        },
        {
            "id": 46,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 1], "targetPos": [3, 4]},
                {"color": "blue", "sourcePos": [5, 3], "targetPos": [3, 3]},
                {"color": "yellow", "sourcePos": [1, 5], "targetPos": [5, 2]},
                {"color": "red", "sourcePos": [6, 0], "targetPos": [2, 0]}
            ]
        },
        {
            "id": 47,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 6], "targetPos": [5, 4]},
                {"color": "blue", "sourcePos": [5, 5], "targetPos": [6, 2]},
                {"color": "yellow", "sourcePos": [1, 2], "targetPos": [5, 0]},
                {"color": "red", "sourcePos": [4, 2], "targetPos": [0, 0]},
                {"color": "pink", "sourcePos": [2, 1], "targetPos": [1, 3]}
            ]
        },
        {
            "id": 48,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [6, 0], "targetPos": [3, 5]},
                {"color": "blue", "sourcePos": [1, 3], "targetPos": [5, 1]},
                {"color": "yellow", "sourcePos": [0, 5], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [4, 5], "targetPos": [4, 1]},
                {"color": "orange", "sourcePos": [2, 1], "targetPos": [0, 1]},
                {"color": "cyan", "sourcePos": [1, 5], "targetPos": [1, 1]},
                {"color": "pink", "sourcePos": [5, 2], "targetPos": [5, 5]}
            ]
        },
        {
            "id": 49,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 5], "targetPos": [3, 1]},
                {"color": "blue", "sourcePos": [2, 4], "targetPos": [0, 0]},
                {"color": "yellow", "sourcePos": [5, 4], "targetPos": [3, 0]},
                {"color": "red", "sourcePos": [0, 2], "targetPos": [1, 0]},
                {"color": "pink", "sourcePos": [6, 0], "targetPos": [5, 5]}
            ]
        },
        {
            "id": 50,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 2], "targetPos": [1, 0]},
                {"color": "blue", "sourcePos": [4, 5], "targetPos": [2, 1]},
                {"color": "yellow", "sourcePos": [1, 4], "targetPos": [4, 2]},
                {"color": "red", "sourcePos": [5, 1], "targetPos": [1, 3]},
                {"color": "orange", "sourcePos": [0, 0], "targetPos": [1, 1]},
                {"color": "pink", "sourcePos": [0, 6], "targetPos": [5, 5]}
            ]
        },
        {
            "id": 51,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 4], "targetPos": [5, 1]},
                {"color": "blue", "sourcePos": [0, 6], "targetPos": [2, 2]},
                {"color": "yellow", "sourcePos": [5, 4], "targetPos": [3, 3]},
                {"color": "red", "sourcePos": [5, 0], "targetPos": [0, 5]},
                {"color": "pink", "sourcePos": [3, 6], "targetPos": [4, 4]}
            ]
        },
        {
            "id": 52,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [4, 2], "targetPos": [0, 3]},
                {"color": "blue", "sourcePos": [1, 5], "targetPos": [2, 2]},
                {"color": "orange", "sourcePos": [6, 0], "targetPos": [0, 1]},
                {"color": "yellow", "sourcePos": [1, 4], "targetPos": [6, 6]},
                {"color": "red", "sourcePos": [4, 3], "targetPos": [3, 2]},
                {"color": "pink", "sourcePos": [1, 1], "targetPos": [0, 2]}
            ]
        },
        {
            "id": 53,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [3, 3], "targetPos": [5, 6]},
                {"color": "blue", "sourcePos": [1, 0], "targetPos": [1, 6]},
                {"color": "cyan", "sourcePos": [4, 6], "targetPos": [1, 5]},
                {"color": "yellow", "sourcePos": [5, 1], "targetPos": [4, 4]},
                {"color": "red", "sourcePos": [2, 3], "targetPos": [2, 0]}
            ]
        },
        {
            "id": 54,
            "rows": 7,
            "columns": 7,
            "linkPairs": [
                {"color": "green", "sourcePos": [0, 6], "targetPos": [2, 1]},
                {"color": "blue", "sourcePos": [6, 6], "targetPos": [3, 4]},
                {"color": "cyan", "sourcePos": [3, 5], "targetPos": [5, 0]},
                {"color": "yellow", "sourcePos": [2, 2], "targetPos": [4, 0]},
                {"color": "red", "sourcePos": [3, 2], "targetPos": [0, 5]},
                {"color": "pink", "sourcePos": [5, 1], "targetPos": [4, 4]}
            ]
        }
    ]
}

function LevelDB() {
}

LevelDB.prototype.getAllLevels = function() {
	return allLevels.levels;
}