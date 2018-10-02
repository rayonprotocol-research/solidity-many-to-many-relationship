pragma solidity ^0.4.19;

contract Course {
    struct CourseEntry{
        uint index;
        string name;
        address teacherId;
        string book;
    }
    mapping(bytes32 => CourseEntry) public courseMap;
    bytes32[] public courseList;

    function add(bytes32 _courseId, string memory _name, address _teacherId, string memory _book) public {
        CourseEntry storage entry = courseMap[_courseId];
        require(!_contains(entry), "courseId cannot be in map");

        entry.index = courseList.push(_courseId) - 1;
        entry.name = _name;
        entry.teacherId = _teacherId;
        entry.book = _book;
    }

    function remove(bytes32 _courseId) public {
        CourseEntry storage entry = courseMap[_courseId];
        require(_contains(entry), "courseId must be present in map");
        require(_isInRange(entry.index), "index must be in range");
        uint256 deleteEntryIndex = entry.index;

        // Move last element into the delete key slot.
        uint256 lastEntryIndex = courseList.length - 1;
        bytes32 lastEntryCourseId = courseList[lastEntryIndex];
        courseMap[lastEntryCourseId].index = deleteEntryIndex; // courseMap
        courseList[deleteEntryIndex] = courseList[lastEntryIndex]; // courseList
        courseList.length--;
        delete courseMap[_courseId];
    }

    function getById(bytes32 _courseId) public view returns (bytes32 courseId, string name, address teacherId, string book) {
        CourseEntry storage entry = courseMap[_courseId];
        require(_contains(entry), "courseId must be present in map");

        return (_courseId, entry.name, entry.teacherId, entry.book);
    }

    function getByIndex(uint _index) public view returns (bytes32 courseId, string name, address teacherId, string book) {
        require(_isInRange(_index), "index must be in range");

        return getById(courseList[_index]);
    }

    function size() public view returns (uint) {
        return courseList.length;
    }

    function contains(bytes32 _courseId) public view returns (bool) {
        CourseEntry storage entry = courseMap[_courseId];
        return _contains(entry);
    }

    function _contains(CourseEntry memory _entry) private pure returns (bool){
        return bytes(_entry.name).length > 0;
    }

    function _isInRange(uint256 _index) private view returns (bool) {
        return (_index >= 0) && (_index < courseList.length);
    }
}