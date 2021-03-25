import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { UserRepository } from "../src/user/user.repository";
import { ROLES } from "../src/auth/auth.config";
import { LinkService } from "../src/link/link.service";
import { AuthService } from "../src/auth/auth.service";

describe("UserController (e2e)", () => {

  const USER_TABLE = "user";
  const TEST_USER_EMAIL = "test@user.com";
  const TEST_USER_PASSWORD = "secretPass51";

  let app: INestApplication;
  let repo: UserRepository;
  let linkService: LinkService;
  let authService: AuthService;
  let adminToken: string;
  let adminId: string;
  let testUserId: string;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repo = moduleFixture.get("UserRepository");
    authService = moduleFixture.get("AuthService");
    linkService = moduleFixture.get("LinkService");

    //cleanup user table
    await repo.query(
      `DELETE FROM ${USER_TABLE};`
    );

    // create an admin user
    const admin = await repo.createUser({ email: "admin@test.com", password: "secretPass51" });
    await repo.updateUser(admin.userId, { role: ROLES.ADMIN });
    adminId = admin.userId;
    adminToken = authService.createAccessToken(admin);
  });

  afterAll(async () => {
    await app.close();
  });

  it("/(CREATE USER)", async () => {

    const email = TEST_USER_EMAIL;
    const password = TEST_USER_PASSWORD;

    const res = await request(app.getHttpServer())
      .post("/user")
      .set("ContentType", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email, password })
      .expect(201);
    expect(res.body.data.email).toEqual(email);
    testUserId = res.body.data.userId;
  });

  it("/(AUTH FAIL - CREATE USER)", async () => {

    const email = TEST_USER_EMAIL;
    const password = TEST_USER_PASSWORD;

    await request(app.getHttpServer())
      .post("/user")
      .set("ContentType", "application/json")
      .set("Authorization", `Bearer invalid-token`)
      .send({ email, password })
      .expect(401);
  });

  it("/ (UPDATE USER)", async () => {

    const email = "new@email.com";

    const res = await request(app.getHttpServer())
      .patch(`/user/${testUserId}`)
      .set("ContentType", "application/json")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email })
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User data updated")
  });

  it("/ (FIND USER)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/user/${testUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.data.userId).toEqual(testUserId);
  });

  it("/ (FIND USERS)", async () => {
    const res = await request(app.getHttpServer())
      .get('/user')
      .set("Authorization", `Bearer ${adminToken}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.data.length).toEqual(2);
  });

});
