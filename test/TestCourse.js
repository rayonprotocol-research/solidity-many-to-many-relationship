require('chai')
    .use(require('chai-as-promised'))
    .should();

const Course = artifacts.require('./Course.sol');

contract('Course', function (accounts) {
    var contract;
    const admin = accounts[0];
    const course1 = { 'id': web3.sha3('English'), 'name': 'English', 'teacherId': accounts[1], 'book': 'English Book' };
    const course2 = { 'id': web3.sha3('Science'), 'name': 'Science', 'teacherId': accounts[2], 'book': 'Moden Science' };
    const course3 = { 'id': web3.sha3('Math'), 'name': 'Math', 'teacherId': accounts[3], 'book': 'Perfect Math' };
    const course4 = { 'id': web3.sha3('History'), 'name': 'History', 'teacherId': accounts[4], 'book': 'Europe History' };

    before('setup contract for each test', async () => {
        contract = await Course.new({ from: admin });
        console.log('Course is deployed: ' + contract.address);
    })

    it('Check empty list', async () => {
        assert.equal(await contract.size(), 0);
    });

    it('Add first course', async () => {
        await contract.add(course1.id, course1.name, course1.teacherId, course1.book).should.be.fulfilled;

        assert.equal(await contract.contains(course1.id), true);

        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getById(course1.id);
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);

        assert.equal(await contract.size(), 1);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0);
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);
    });
    it('Remove first course', async () => {
        await contract.remove(course1.id).should.be.fulfilled;

        assert.equal(await contract.contains(course1.id), false);

        assert.equal(await contract.size(), 0);
    });
    it('Add first & second courses', async () => {
        await contract.add(course1.id, course1.name, course1.teacherId, course1.book).should.be.fulfilled;
        await contract.add(course2.id, course2.name, course2.teacherId, course2.book).should.be.fulfilled;

        assert.equal(await contract.contains(course1.id), true);
        assert.equal(await contract.contains(course2.id), true);

        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getById(course1.id);
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getById(course2.id);
        assert.equal(courseId, course2.id);
        assert.equal(courseName, course2.name);
        assert.equal(courseTeacherId, course2.teacherId);
        assert.equal(courseBook, course2.book);

        assert.equal(await contract.size(), 2);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0); // index 0 : course1
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(1); // index 1 : course2
        assert.equal(courseId, course2.id);
        assert.equal(courseName, course2.name);
        assert.equal(courseTeacherId, course2.teacherId);
        assert.equal(courseBook, course2.book);
    });
    it('Add third & fourth courses', async () => {
        await contract.add(course3.id, course3.name, course3.teacherId, course3.book).should.be.fulfilled;
        await contract.add(course4.id, course4.name, course4.teacherId, course4.book).should.be.fulfilled;

        assert.equal(await contract.contains(course1.id), true);
        assert.equal(await contract.contains(course2.id), true);
        assert.equal(await contract.contains(course3.id), true);
        assert.equal(await contract.contains(course4.id), true);

        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getById(course3.id);
        assert.equal(courseId, course3.id);
        assert.equal(courseName, course3.name);
        assert.equal(courseTeacherId, course3.teacherId);
        assert.equal(courseBook, course3.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getById(course4.id);
        assert.equal(courseId, course4.id);
        assert.equal(courseName, course4.name);
        assert.equal(courseTeacherId, course4.teacherId);
        assert.equal(courseBook, course4.book);

        assert.equal(await contract.size(), 4);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0); // index 0 : course1
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(1); // index 1 : course2
        assert.equal(courseId, course2.id);
        assert.equal(courseName, course2.name);
        assert.equal(courseTeacherId, course2.teacherId);
        assert.equal(courseBook, course2.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(2); // index 2 : course3
        assert.equal(courseId, course3.id);
        assert.equal(courseName, course3.name);
        assert.equal(courseTeacherId, course3.teacherId);
        assert.equal(courseBook, course3.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(3); // index 3 : course4
        assert.equal(courseId, course4.id);
        assert.equal(courseName, course4.name);
        assert.equal(courseTeacherId, course4.teacherId);
        assert.equal(courseBook, course4.book);
    });
    it('Remove second course', async () => {
        await contract.remove(course2.id).should.be.fulfilled;

        assert.equal(await contract.contains(course2.id), false);

        assert.equal(await contract.size(), 3);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0); // index 0 : course1
        assert.equal(courseId, course1.id);
        assert.equal(courseName, course1.name);
        assert.equal(courseTeacherId, course1.teacherId);
        assert.equal(courseBook, course1.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(1); // index 1 : course4
        assert.equal(courseId, course4.id);
        assert.equal(courseName, course4.name);
        assert.equal(courseTeacherId, course4.teacherId);
        assert.equal(courseBook, course4.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(2); // index 2 : course3
        assert.equal(courseId, course3.id);
        assert.equal(courseName, course3.name);
        assert.equal(courseTeacherId, course3.teacherId);
        assert.equal(courseBook, course3.book);
    });
    it('Remove first course', async () => {
        await contract.remove(course1.id).should.be.fulfilled;

        assert.equal(await contract.contains(course1.id), false);

        assert.equal(await contract.size(), 2);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0); // index 0 : course3
        assert.equal(courseId, course3.id);
        assert.equal(courseName, course3.name);
        assert.equal(courseTeacherId, course3.teacherId);
        assert.equal(courseBook, course3.book);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(1); // index 1 : course4
        assert.equal(courseId, course4.id);
        assert.equal(courseName, course4.name);
        assert.equal(courseTeacherId, course4.teacherId);
        assert.equal(courseBook, course4.book);
    });
    it('Remove fourth course', async () => {
        await contract.remove(course4.id).should.be.fulfilled;

        assert.equal(await contract.contains(course4.id), false);

        assert.equal(await contract.size(), 1);
        var [courseId, courseName, courseTeacherId, courseBook] = await contract.getByIndex(0); // index 0 : course3
        assert.equal(courseId, course3.id);
        assert.equal(courseName, course3.name);
        assert.equal(courseTeacherId, course3.teacherId);
        assert.equal(courseBook, course3.book);
    });
    it('Remove third course', async () => {
        await contract.remove(course3.id).should.be.fulfilled;

        assert.equal(await contract.contains(course3.id), false);

        assert.equal(await contract.size(), 0);
    });
})