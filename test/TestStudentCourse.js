require('chai')
    .use(require('chai-as-promised'))
    .should();

const StudentCourse = artifacts.require('./StudentCourse.sol');

contract('StudentCourse', function (accounts) {
    var contract;
    const admin = accounts[0];
    const student1 = { 'id': accounts[1], 'name': "student1" };
    const student2 = { 'id': accounts[2], 'name': "student2" };
    const student3 = { 'id': accounts[3], 'name': "student3" };
    const student4 = { 'id': accounts[4], 'name': "student4" };
    const course1 = { 'id': web3.sha3('English'), 'name': 'English', 'teacherId': accounts[5], 'book': 'English Book' };
    const course2 = { 'id': web3.sha3('Science'), 'name': 'Science', 'teacherId': accounts[6], 'book': 'Moden Science' };
    const course3 = { 'id': web3.sha3('Math'), 'name': 'Math', 'teacherId': accounts[7], 'book': 'Perfect Math' };
    const course4 = { 'id': web3.sha3('History'), 'name': 'History', 'teacherId': accounts[8], 'book': 'Europe History' };
    const course5 = { 'id': web3.sha3('Music'), 'name': 'Music', 'teacherId': accounts[9], 'book': 'Music Song' };
    const course6 = { 'id': web3.sha3('Physics'), 'name': 'Physics', 'teacherId': accounts[10], 'book': 'GRE Physics' };

    before('setup contract for each test', async () => {
        contract = await StudentCourse.new({ from: admin });
        console.log('StudentCourse is deployed: ' + contract.address);
    })

    it("Check empty list", async () => {
        assert.equal(await contract.getConnectedTotalCount(), 0);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 0);
    });

    it("connect first student and courses", async () => {
        // student 1 <-> course 2,3,5
        assert.equal(await contract.isConnect(student1.id, course1.id), false);
        assert.equal(await contract.isConnect(student1.id, course2.id), false);
        assert.equal(await contract.isConnect(student1.id, course3.id), false);
        assert.equal(await contract.isConnect(student1.id, course4.id), false);
        assert.equal(await contract.isConnect(student1.id, course5.id), false);
        assert.equal(await contract.isConnect(student1.id, course6.id), false);

        await contract.connect(student1.id, course2.id).should.be.fulfilled;
        await contract.connect(student1.id, course3.id).should.be.fulfilled;
        await contract.connect(student1.id, course5.id).should.be.fulfilled;

        assert.equal(await contract.isConnect(student1.id, course1.id), false);
        assert.equal(await contract.isConnect(student1.id, course2.id), true);
        assert.equal(await contract.isConnect(student1.id, course3.id), true);
        assert.equal(await contract.isConnect(student1.id, course4.id), false);
        assert.equal(await contract.isConnect(student1.id, course5.id), true);
        assert.equal(await contract.isConnect(student1.id, course6.id), false);

        assert.equal(await contract.getConnectedTotalCount(), 3);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 0);

        // check course 2,3,5
        assert.equal(await contract.getConnectedCourseId(student1.id, 0), course2.id);
        assert.equal(await contract.getConnectedCourseId(student1.id, 1), course3.id);
        assert.equal(await contract.getConnectedCourseId(student1.id, 2), course5.id);
    });
    it("connect second student and courses", async () => {
        // student 2 <-> course 1,2,3,4,5,6
        assert.equal(await contract.isConnect(student2.id, course1.id), false);
        assert.equal(await contract.isConnect(student2.id, course2.id), false);
        assert.equal(await contract.isConnect(student2.id, course3.id), false);
        assert.equal(await contract.isConnect(student2.id, course4.id), false);
        assert.equal(await contract.isConnect(student2.id, course5.id), false);
        assert.equal(await contract.isConnect(student2.id, course6.id), false);

        await contract.connect(student2.id, course1.id).should.be.fulfilled;
        await contract.connect(student2.id, course2.id).should.be.fulfilled;
        await contract.connect(student2.id, course3.id).should.be.fulfilled;
        await contract.connect(student2.id, course4.id).should.be.fulfilled;
        await contract.connect(student2.id, course5.id).should.be.fulfilled;
        await contract.connect(student2.id, course6.id).should.be.fulfilled;

        assert.equal(await contract.isConnect(student2.id, course1.id), true);
        assert.equal(await contract.isConnect(student2.id, course2.id), true);
        assert.equal(await contract.isConnect(student2.id, course3.id), true);
        assert.equal(await contract.isConnect(student2.id, course4.id), true);
        assert.equal(await contract.isConnect(student2.id, course5.id), true);
        assert.equal(await contract.isConnect(student2.id, course6.id), true);

        assert.equal(await contract.getConnectedTotalCount(), 9);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 6);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 0);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 1);

        // check course 1,2,3,4,5,6
        assert.equal(await contract.getConnectedCourseId(student2.id, 0), course1.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 1), course2.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 2), course3.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 3), course4.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 4), course5.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 5), course6.id);
    });
    it("connect third student and courses", async () => {
        // student 3 <-> course 2
        assert.equal(await contract.isConnect(student3.id, course1.id), false);
        assert.equal(await contract.isConnect(student3.id, course2.id), false);
        assert.equal(await contract.isConnect(student3.id, course3.id), false);
        assert.equal(await contract.isConnect(student3.id, course4.id), false);
        assert.equal(await contract.isConnect(student3.id, course5.id), false);
        assert.equal(await contract.isConnect(student3.id, course6.id), false);

        await contract.connect(student3.id, course2.id).should.be.fulfilled;

        assert.equal(await contract.isConnect(student3.id, course1.id), false);
        assert.equal(await contract.isConnect(student3.id, course2.id), true);
        assert.equal(await contract.isConnect(student3.id, course3.id), false);
        assert.equal(await contract.isConnect(student3.id, course4.id), false);
        assert.equal(await contract.isConnect(student3.id, course5.id), false);
        assert.equal(await contract.isConnect(student3.id, course6.id), false);

        assert.equal(await contract.getConnectedTotalCount(), 10);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 6);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 1);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 3);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 1);

        // check course 2
        assert.equal(await contract.getConnectedCourseId(student3.id, 0), course2.id);
    });
    it("connect fourth student and courses", async () => {
        // student 4 <-> course 2,6
        assert.equal(await contract.isConnect(student4.id, course1.id), false);
        assert.equal(await contract.isConnect(student4.id, course2.id), false);
        assert.equal(await contract.isConnect(student4.id, course3.id), false);
        assert.equal(await contract.isConnect(student4.id, course4.id), false);
        assert.equal(await contract.isConnect(student4.id, course5.id), false);
        assert.equal(await contract.isConnect(student4.id, course6.id), false);

        await contract.connect(student4.id, course2.id).should.be.fulfilled;
        await contract.connect(student4.id, course6.id).should.be.fulfilled;

        assert.equal(await contract.isConnect(student4.id, course1.id), false);
        assert.equal(await contract.isConnect(student4.id, course2.id), true);
        assert.equal(await contract.isConnect(student4.id, course3.id), false);
        assert.equal(await contract.isConnect(student4.id, course4.id), false);
        assert.equal(await contract.isConnect(student4.id, course5.id), false);
        assert.equal(await contract.isConnect(student4.id, course6.id), true);

        assert.equal(await contract.getConnectedTotalCount(), 12);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 6);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 1);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 4);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 2);

        // check course 2
        assert.equal(await contract.getConnectedCourseId(student4.id, 0), course2.id);
        assert.equal(await contract.getConnectedCourseId(student4.id, 1), course6.id);
    });
    it("check courses and connected students", async () => {
        // course 1 <-> student 2
        assert.equal(await contract.getConnectedStudentCount(course1.id), 1);
        assert.equal(await contract.getConnectedStudentId(course1.id, 0), student2.id);

        // course 2 <-> student 1,2,3,4
        assert.equal(await contract.getConnectedStudentCount(course2.id), 4);
        assert.equal(await contract.getConnectedStudentId(course2.id, 0), student1.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 1), student2.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 2), student3.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 3), student4.id);

        // course 3 <-> student 1,2
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentId(course3.id, 0), student1.id);
        assert.equal(await contract.getConnectedStudentId(course3.id, 1), student2.id);

        // course 4 <-> student 2
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentId(course4.id, 0), student2.id);

        // course 5 <-> student 1,2
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentId(course5.id, 0), student1.id);
        assert.equal(await contract.getConnectedStudentId(course5.id, 1), student2.id);

        // course 6 <-> student 2,4
        assert.equal(await contract.getConnectedStudentCount(course6.id), 2);
        assert.equal(await contract.getConnectedStudentId(course6.id, 0), student2.id);
        assert.equal(await contract.getConnectedStudentId(course6.id, 1), student4.id);
    });
    it("try to connect students and courses which are already connected", async () => {
        await contract.connect(student1.id, course2.id).should.be.rejectedWith(/revert/);
        await contract.connect(student2.id, course6.id).should.be.rejectedWith(/revert/);
        await contract.connect(student3.id, course2.id).should.be.rejectedWith(/revert/);
        await contract.connect(student4.id, course6.id).should.be.rejectedWith(/revert/);
    });
    it("disconnect student 2 <-> course 2", async () => {
        // before sending disconnect
        assert.equal(await contract.isConnect(student2.id, course1.id), true);
        assert.equal(await contract.isConnect(student2.id, course2.id), true);
        assert.equal(await contract.isConnect(student2.id, course3.id), true);
        assert.equal(await contract.isConnect(student2.id, course4.id), true);
        assert.equal(await contract.isConnect(student2.id, course5.id), true);
        assert.equal(await contract.isConnect(student2.id, course6.id), true);

        await contract.disconnect(student2.id, course2.id).should.be.fulfilled;

        // after sending disconnect
        assert.equal(await contract.isConnect(student2.id, course1.id), true);
        assert.equal(await contract.isConnect(student2.id, course2.id), false);
        assert.equal(await contract.isConnect(student2.id, course3.id), true);
        assert.equal(await contract.isConnect(student2.id, course4.id), true);
        assert.equal(await contract.isConnect(student2.id, course5.id), true);
        assert.equal(await contract.isConnect(student2.id, course6.id), true);

        assert.equal(await contract.getConnectedTotalCount(), 11);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 5);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 1);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 3);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 2);

        // check student 2 <-> course 1,6,3,4,5
        assert.equal(await contract.getConnectedCourseCount(student2.id), 5);
        assert.equal(await contract.getConnectedCourseId(student2.id, 0), course1.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 1), course6.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 2), course3.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 3), course4.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 4), course5.id);

        // check course 2 <-> student 1,4,3
        assert.equal(await contract.getConnectedStudentCount(course2.id), 3);
        assert.equal(await contract.getConnectedStudentId(course2.id, 0), student1.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 1), student4.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 2), student3.id);
    });
    it("disconnect student 2 <-> course 1", async () => {
        // before sending disconnect
        assert.equal(await contract.isConnect(student2.id, course1.id), true);
        assert.equal(await contract.isConnect(student2.id, course2.id), false);
        assert.equal(await contract.isConnect(student2.id, course3.id), true);
        assert.equal(await contract.isConnect(student2.id, course4.id), true);
        assert.equal(await contract.isConnect(student2.id, course5.id), true);
        assert.equal(await contract.isConnect(student2.id, course6.id), true);

        await contract.disconnect(student2.id, course1.id).should.be.fulfilled;

        // after sending disconnect
        assert.equal(await contract.isConnect(student2.id, course1.id), false);
        assert.equal(await contract.isConnect(student2.id, course2.id), false);
        assert.equal(await contract.isConnect(student2.id, course3.id), true);
        assert.equal(await contract.isConnect(student2.id, course4.id), true);
        assert.equal(await contract.isConnect(student2.id, course5.id), true);
        assert.equal(await contract.isConnect(student2.id, course6.id), true);

        assert.equal(await contract.getConnectedTotalCount(), 10);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 4);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 1);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 3);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 2);

        // check student 2 <-> course 5,6,3,4
        assert.equal(await contract.getConnectedCourseCount(student2.id), 4);
        assert.equal(await contract.getConnectedCourseId(student2.id, 0), course5.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 1), course6.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 2), course3.id);
        assert.equal(await contract.getConnectedCourseId(student2.id, 3), course4.id);

        // check course 1 <-> student
        assert.equal(await contract.getConnectedStudentCount(course1.id), 0);
    });
    it("disconnect student 4 <-> course 2", async () => {
        // before sending disconnect
        assert.equal(await contract.isConnect(student4.id, course1.id), false);
        assert.equal(await contract.isConnect(student4.id, course2.id), true);
        assert.equal(await contract.isConnect(student4.id, course3.id), false);
        assert.equal(await contract.isConnect(student4.id, course4.id), false);
        assert.equal(await contract.isConnect(student4.id, course5.id), false);
        assert.equal(await contract.isConnect(student4.id, course6.id), true);

        await contract.disconnect(student4.id, course2.id).should.be.fulfilled;

        // after sending disconnect
        assert.equal(await contract.isConnect(student4.id, course1.id), false);
        assert.equal(await contract.isConnect(student4.id, course2.id), false);
        assert.equal(await contract.isConnect(student4.id, course3.id), false);
        assert.equal(await contract.isConnect(student4.id, course4.id), false);
        assert.equal(await contract.isConnect(student4.id, course5.id), false);
        assert.equal(await contract.isConnect(student4.id, course6.id), true);

        assert.equal(await contract.getConnectedTotalCount(), 9);
        assert.equal(await contract.getConnectedCourseCount(student1.id), 3);
        assert.equal(await contract.getConnectedCourseCount(student2.id), 4);
        assert.equal(await contract.getConnectedCourseCount(student3.id), 1);
        assert.equal(await contract.getConnectedCourseCount(student4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course1.id), 0);
        assert.equal(await contract.getConnectedStudentCount(course2.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course3.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course4.id), 1);
        assert.equal(await contract.getConnectedStudentCount(course5.id), 2);
        assert.equal(await contract.getConnectedStudentCount(course6.id), 2);

        // check student 4 <-> course 6
        assert.equal(await contract.getConnectedCourseCount(student4.id), 1);
        assert.equal(await contract.getConnectedCourseId(student4.id, 0), course6.id);

        // check course 2 <-> student 1,3
        assert.equal(await contract.getConnectedStudentCount(course2.id), 2);
        assert.equal(await contract.getConnectedStudentId(course2.id, 0), student1.id);
        assert.equal(await contract.getConnectedStudentId(course2.id, 1), student3.id);
    });
    it("try to disconnect students and courses which are not connected", async () => {
        await contract.disconnect(student1.id, course1.id).should.be.rejectedWith(/revert/);
        await contract.disconnect(student3.id, course5.id).should.be.rejectedWith(/revert/);
        await contract.disconnect(student2.id, course1.id).should.be.rejectedWith(/revert/);
        await contract.disconnect(student4.id, course2.id).should.be.rejectedWith(/revert/);
    });

})