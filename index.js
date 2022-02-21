const core = require('@actions/core');
const github = require('@actions/github');
const {exec} = require('child_process');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('repo-name');
  console.log(`App Name ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
    exec(`echo "Just before gradle build" && gradle tasks --all && ./gradlew build`,(error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}