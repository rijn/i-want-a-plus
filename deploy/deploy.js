/* jshint esversion: 5 */

const path = '/root/i-want-a-plus';

var grunt = require('grunt');
var Git = require("nodegit");

require(path + '/Gruntfile.js')(grunt);

var githubhook = require('githubhook');
var github = githubhook({ port: 8001 });

github.listen();

github.on('push:i-want-a-plus:refs/heads/master', function (data) {
    console.log('updating...');
    var repository;
    Git.Repository.open(path).then((repo) => {
        console.log('fetching...');
        repository = repo;
        return repository.fetchAll({ callbacks: {
            certificateCheck: () => 1,
            credentials: (url, userName) => {
                return Git.Cred.sshKeyNew(
                    userName,
                    '/root/.ssh/id_rsa.pub',
                    '/root/.ssh/id_rsa',
                    ''
                );
            }
        } });
    }).then(() => {
        console.log('merging...');
        repository.mergeBranches("master", "origin/master");
    }).then(() => {
        console.log('deploying...');
        return grunt.tasks(['deploy', 'shell:restartTest']);
    }).done();
});
