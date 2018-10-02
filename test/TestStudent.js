require('chai')
    .use(require('chai-as-promised'))
    .should();

const Student = artifacts.require('./Student.sol');

contract('Student', function (accounts) {
    var contract;
    const admin = accounts[0];
    const student1 = { 'id': accounts[1], 'name': 'student1' };
    const student2 = { 'id': accounts[2], 'name': 'student2' };
    const student3 = { 'id': accounts[3], 'name': 'student3' };
    const student4 = { 'id': accounts[4], 'name': 'student4' };

    before('setup contract for each test', async () => {
        contract = await Student.new({ from: admin });
        console.log('Student is deployed: ' + contract.address);
    })

    it('Check empty list', async () => {
        assert.equal(await contract.size(), 0);
    });

    it('Add first student', async () => {
        await contract.add(student1.id, student1.name).should.be.fulfilled;

        assert.equal(await contract.contains(student1.id), true);

        var [studentId, studentName] = await contract.getById(student1.id);
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);

        assert.equal(await contract.size(), 1);
        var [studentId, studentName] = await contract.getByIndex(0);
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);
    });
    it('Add first student again', async () => {
        await contract.add(student1.id, student1.name).should.be.rejectedWith(/revert/);
    });
    it('Remove first student', async () => {
        await contract.remove(student1.id).should.be.fulfilled;

        assert.equal(await contract.contains(student1.id), false);

        assert.equal(await contract.size(), 0);
    });
    it('Remove first student again', async () => {
        await contract.remove(student1.id).should.be.rejectedWith(/revert/);
    });
    it('Add first & second students', async () => {
        await contract.add(student1.id, student1.name).should.be.fulfilled;
        await contract.add(student2.id, student2.name).should.be.fulfilled;

        assert.equal(await contract.contains(student1.id), true);
        assert.equal(await contract.contains(student2.id), true);

        var [studentId, studentName] = await contract.getById(student1.id);
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);
        var [studentId, studentName] = await contract.getById(student2.id);
        assert.equal(studentId, student2.id);
        assert.equal(studentName, student2.name);

        assert.equal(await contract.size(), 2);
        var [studentId, studentName] = await contract.getByIndex(0); // index 0 : student1
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);
        var [studentId, studentName] = await contract.getByIndex(1); // index 1 : student2
        assert.equal(studentId, student2.id);
        assert.equal(studentName, student2.name);
    });
    it('Add third & fourth students', async () => {
        await contract.add(student3.id, student3.name).should.be.fulfilled;
        await contract.add(student4.id, student4.name).should.be.fulfilled;

        assert.equal(await contract.contains(student1.id), true);
        assert.equal(await contract.contains(student2.id), true);
        assert.equal(await contract.contains(student3.id), true);
        assert.equal(await contract.contains(student4.id), true);

        var [studentId, studentName] = await contract.getById(student3.id);
        assert.equal(studentId, student3.id);
        assert.equal(studentName, student3.name);
        var [studentId, studentName] = await contract.getById(student4.id);
        assert.equal(studentId, student4.id);
        assert.equal(studentName, student4.name);

        assert.equal(await contract.size(), 4);
        var [studentId, studentName] = await contract.getByIndex(0); // index 0 : student1
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);
        var [studentId, studentName] = await contract.getByIndex(1); // index 1 : student2
        assert.equal(studentId, student2.id);
        assert.equal(studentName, student2.name);
        var [studentId, studentName] = await contract.getByIndex(2); // index 2 : student3
        assert.equal(studentId, student3.id);
        assert.equal(studentName, student3.name);
        var [studentId, studentName] = await contract.getByIndex(3); // index 3 : student4
        assert.equal(studentId, student4.id);
        assert.equal(studentName, student4.name);
    });
    it('Remove second student', async () => {
        await contract.remove(student2.id).should.be.fulfilled;

        assert.equal(await contract.contains(student2.id), false);

        assert.equal(await contract.size(), 3);
        var [studentId, studentName] = await contract.getByIndex(0); // index 0 : student1
        assert.equal(studentId, student1.id);
        assert.equal(studentName, student1.name);
        var [studentId, studentName] = await contract.getByIndex(1); // index 1 : student4
        assert.equal(studentId, student4.id);
        assert.equal(studentName, student4.name);
        var [studentId, studentName] = await contract.getByIndex(2); // index 2 : student3
        assert.equal(studentId, student3.id);
        assert.equal(studentName, student3.name);
    });
    it('Remove first student', async () => {
        await contract.remove(student1.id).should.be.fulfilled;

        assert.equal(await contract.contains(student1.id), false);

        assert.equal(await contract.size(), 2);
        var [studentId, studentName] = await contract.getByIndex(0); // index 0 : student3
        assert.equal(studentId, student3.id);
        assert.equal(studentName, student3.name);
        var [studentId, studentName] = await contract.getByIndex(1); // index 1 : student4
        assert.equal(studentId, student4.id);
        assert.equal(studentName, student4.name);
    });
    it('Remove fourth student', async () => {
        await contract.remove(student4.id).should.be.fulfilled;

        assert.equal(await contract.contains(student4.id), false);

        assert.equal(await contract.size(), 1);
        var [studentId, studentName] = await contract.getByIndex(0); // index 0 : student3
        assert.equal(studentId, student3.id);
        assert.equal(studentName, student3.name);
    });
    it('Remove third student', async () => {
        await contract.remove(student3.id).should.be.fulfilled;

        assert.equal(await contract.contains(student3.id), false);

        assert.equal(await contract.size(), 0);
    });
})