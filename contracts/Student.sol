pragma solidity ^0.4.19;

contract Student {
    struct StudentEntry{
        uint index;
        string name;
    }
    mapping(address => StudentEntry) public studentMap;
    address[] public studentList;

    function add(address _studentId, string memory _name) public {
        StudentEntry storage entry = studentMap[_studentId];
        require(!_contains(entry), "studentId cannot be in map");

        entry.index = studentList.push(_studentId) - 1;
        entry.name = _name;
    }

    function remove(address _studentId) public {
        StudentEntry storage entry = studentMap[_studentId];
        require(_contains(entry), "studentId must be present in map");
        require(_isInRange(entry.index), "index must be in range");
        uint256 deleteEntryIndex = entry.index;

        // Move last element into the delete key slot.
        uint256 lastEntryIndex = studentList.length - 1;
        address lastEntryStudentId = studentList[lastEntryIndex];
        studentMap[lastEntryStudentId].index = deleteEntryIndex; // studentMap
        studentList[deleteEntryIndex] = studentList[lastEntryIndex]; // studentList
        studentList.length--;
        delete studentMap[_studentId];
    }

    function getById(address _studentId) public view returns (address studentId, string name) {
        StudentEntry storage entry = studentMap[_studentId];
        require(_contains(entry), "studentId must be present in map");

        return (_studentId, entry.name);
    }

    function getByIndex(uint _index) public view returns (address studentId, string name) {
        require(_isInRange(_index), "index must be in range");

        return getById(studentList[_index]);
    }

    function size() public view returns (uint) {
        return studentList.length;
    }

    function contains(address _studentId) public view returns (bool) {
        StudentEntry storage entry = studentMap[_studentId];
        return _contains(entry);
    }

    function _contains(StudentEntry memory _entry) private pure returns (bool){
        return bytes(_entry.name).length > 0;
    }

    function _isInRange(uint256 _index) private view returns (bool) {
        return (_index >= 0) && (_index < studentList.length);
    }
}