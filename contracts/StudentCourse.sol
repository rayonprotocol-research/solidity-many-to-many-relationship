pragma solidity ^0.4.19;

contract StudentCourse {
    struct StudentCourseEntry{
        address studentId;
        bytes32 courseId;
        uint entryKeyIndex;
        uint studentToCourseIndex;
        uint courceToStudentIndex;
    }
    mapping(bytes32 => StudentCourseEntry) public entryMap;
    mapping(address => mapping(bytes32 => bytes32)) public studentToCourseMap; // Student + Course => key of entryMap

    bytes32[] public entryKeyList; // key list of entryMap
    mapping(address => bytes32[]) public studentToCourseListMap; // Student => key list of entryMap
    mapping(bytes32 => bytes32[]) public courseToStudentListMap; // Course => key list of entryMap


    function connect(address _studentId, bytes32 _courseId) public {
        require(!isConnect(_studentId,_courseId), "entry cannot be in map");

        bytes32 key = keccak256(abi.encodePacked(_studentId, _courseId));

        StudentCourseEntry storage entry = entryMap[key]; // entryMap
        entry.studentId = _studentId;
        entry.courseId = _courseId;
        entry.entryKeyIndex = entryKeyList.push(key) - 1; // entryKeyList
        entry.studentToCourseIndex = studentToCourseListMap[_studentId].push(key) - 1; // studentToCourseListMap
        entry.courceToStudentIndex = courseToStudentListMap[_courseId].push(key) - 1; // courseToStudentListMap

        studentToCourseMap[_studentId][_courseId] = key; // studentToCourseMap
    }

    function disconnect(address _studentId, bytes32 _courseId) public {
    }

    function isConnect(address _studentId, bytes32 _courseId) public view returns (bool) {
        return _isConnect(studentToCourseMap[_studentId][_courseId]);
    }

    function getConnectedTotalCount() public view returns (uint){
        return entryKeyList.length;
    }

    function getConnectedCourseCount(address _studentId) public view returns (uint){
        return studentToCourseListMap[_studentId].length;
    }

    function getConnectedCourseId(address _studentId, uint index) public view returns (bytes32){
        bytes32 key = studentToCourseListMap[_studentId][index];
        require(_isConnect(key), "entry must be present in map");

        StudentCourseEntry storage entry = entryMap[key];
        return entry.courseId;
    }

    function getConnectedStudentCount(bytes32 _courseId) public view returns (uint){
        return courseToStudentListMap[_courseId].length;
    }

    function getConnectedStudentId(bytes32 _courseId, uint index) public view returns (address){
        bytes32 key = courseToStudentListMap[_courseId][index];
        require(_isConnect(key), "entry must be present in map");

        StudentCourseEntry storage entry = entryMap[key];
        return entry.studentId;
    }

    function _isConnect(bytes32 key) private pure returns (bool) {
        return key != 0;
    }
}