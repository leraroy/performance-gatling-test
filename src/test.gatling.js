import {
    simulation,
    atOnceUsers,
    global,
    scenario,
    getParameter,
    rampUsersPerSec,
    rampUsers,
    constantUsersPerSec, stressPeakUsers, rampConcurrentUsers
} from "@gatling.io/core";
import {http, status} from "@gatling.io/http";

export default simulation((setUp) => {

    const httpProtocol = http
        .baseUrl("https://api.clickup.com/api/v2")
        .acceptHeader("application/json")
        .acceptHeader("application/json")
        .authorizationHeader(
            "pk_188624285_4APC1AJV50W39BYZRJ6A1DK1PU0HRQA2"
        );

    const scn1 = scenario("Scenario 1")
        .exec(http("Session 1").get("/user").check(status().is(200)));

    const scn2 = scenario("Scenario 2")
        .exec(http("Session 2").get("/user").check(status().is(200)));


    setUp(
        scn1.injectOpen(
            constantUsersPerSec(10).during(20),
            stressPeakUsers(100).during(5),
            constantUsersPerSec(10).during(20)
).protocols(httpProtocol),

    scn2.injectOpen(
        constantUsersPerSec(20).during(20),
        rampUsers(100).during(30)
).protocols(httpProtocol)
    )
});
