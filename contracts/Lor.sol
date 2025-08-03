// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract LoR {
    address public owner;

    struct Student {
        string name;
        string course;
        string email;
        bool recommendationRequested;
        bool recommendationApproved;
    }

    mapping(uint => Student) public students;
    mapping(address => bool) public approvers;
    uint public studentCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyApprover() {
        require(approvers[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function authorizeApprover(address _addr) external onlyOwner {
        approvers[_addr] = true;
    }

    function deauthorizeApprover(address _addr) external onlyOwner {
        approvers[_addr] = false;
    }

    function addStudent(string memory _name, string memory _course, string memory _email) external {
        students[studentCount] = Student(_name, _course, _email, false, false);
        studentCount++;
    }

    function requestRecommendation(uint _id) external {
        require(_id < studentCount, "Invalid student ID");
        students[_id].recommendationRequested = true;
    }

    function approveRecommendation(uint _id) external onlyApprover {
        require(_id < studentCount, "Invalid student ID");
        require(students[_id].recommendationRequested, "Recommendation not requested");
        students[_id].recommendationApproved = true;
    }

    function getStudent(uint _id) external view returns (string memory, string memory, string memory, bool, bool) {
        Student memory s = students[_id];
        return (s.name, s.course, s.email, s.recommendationRequested, s.recommendationApproved);
    }
}
