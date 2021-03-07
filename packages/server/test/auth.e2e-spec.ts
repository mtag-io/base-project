import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { UserRepository } from "../src/user/user.repository";
import { ACTIVATE, DEACTIVATE, EMAIL_VERIFY_EMAIL, PROMOTE_ADMIN } from "../src/@constants";
import { ROLES } from "../src/@config/server.config";
import { User } from "../src/user/user.entity";
import { LinkService } from "../src/link/link.service";
import { AuthService } from "../src/auth/auth.service";

describe("AuthController (e2e)", () => {

  const USER_TABLE = "user";
  const TEST_USER_EMAIL = "test@user.com";
  const TEST_USER_PASSWORD = "secretPass51";

  let app: INestApplication;
  let repo: UserRepository;
  let linkService: LinkService;
  let authService: AuthService;
  let adminToken: string;
  let adminId: string;
  let testToken: string;
  let testUserId: string;
  let accessLink: string;


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
    adminToken = authService.createToken(admin);
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (SIGNUP TEST USER)", async () => {

    const email = TEST_USER_EMAIL;
    const password = TEST_USER_PASSWORD;

    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .set("ContentType", "application/json")
      .send({ email, password })
      .expect(201);
    expect(res.body.user.email).toEqual(email);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
    testUserId = res.body.user.userId;
  });

  it("/ (SIGNIN TEST USER)", async () => {

    const email = TEST_USER_EMAIL;
    const password = TEST_USER_PASSWORD;

    const res = await request(app.getHttpServer())
      .post("/auth/signin")
      .set("ContentType", "application/json")
      .send({ email, password })
      .expect(200);
    expect(res.body.user.email).toEqual(email);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
    testToken = res.body.accessToken;
  });

  it("/ (PROMOTE TEST USER)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/auth/${PROMOTE_ADMIN}/${testUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User account promoted to admin");
    const testUser: User = await repo.findOne({ where: { userId: testUserId } });
    expect(testUser.role).toEqual(ROLES.ADMIN);
  });

  it("/ (VERIFY EMAIL REQUEST FOR TEST USER)", async () => {
    const res = await request(app.getHttpServer())
      .put(`/auth/${EMAIL_VERIFY_EMAIL}/${testUserId}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("An email containing further instructions will be send" +
      " to the registered email address");
    const link = await linkService.getLink({ userId: testUserId });
    expect(link && link.valid).toBe(true);
    if(link) accessLink = link.hash
  });

  it("/ (VERIFY EMAIL ACCESS FOR TEST USER)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/auth/${EMAIL_VERIFY_EMAIL}/${accessLink}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual('Email verified');
    const testUser = await repo.findOne({ userId: testUserId });
    expect(testUser && testUser.verified).toBe(true)
  });

  it("/ (DEACTIVATE TEST USER)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/auth/${DEACTIVATE}/${testUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User account deactivated");
    const testUser: User = await repo.findOne({ where: { userId: testUserId } });
    expect(testUser.active).toBe(false);
  });

  it("/ (ACTIVATE TEST USER)", async () => {
    const res = await request(app.getHttpServer())
      .get(`/auth/${ACTIVATE}/${testUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .set("ContentType", "application/json")
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toEqual("User account activated");
    const testUser: User = await repo.findOne({ where: { userId: testUserId } });
    expect(testUser.active).toBe(true);
  });
});
