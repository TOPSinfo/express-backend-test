const { getLocus } = require('../controllers/locus.controller');
const { users } = require('../config/details');

let data = {
      user: { role: users.admin.role },
      query: { page: 1, pageSize: 1},
}

describe('getLocus', () => {
  it('should retrieve locus data for an admin user :', async () => {
    const req = data;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];

    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(1); 
    expect(responseData.status).toBe(true);
  }, 240000);

  it('should retrieve locus data with out locus members for an admin user with sideLoading=0 :', async () => {
    data.query.sideLoading = false;
    const req = data;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(1); 
    expect(responseData.status).toBe(true);
    expect(responseData.data.LocusMembers).toBeUndefined();

  });

  it('should retrieve locus data for an admin user with id=0 :', async () => {
    const req = data;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];

    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(1); 
    expect(responseData.status).toBe(true);
    expect(responseData.data.id).toBeUndefined();

  });

  it('should retrieve locus data for an normal user with out locus members :', async () => {
    data.user.role = users.normal.role;

    const req = data;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];

    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(1); 
    expect(responseData.status).toBe(true);
    expect(responseData.data.LocusMembers).toBeUndefined();
  });

  it('should retrieve locus data for an limited users with olnly allowed fields :', async () => {
    data.query.pageSize = 10;
    data.user.role = users.limited.role;
    const req = data;
    
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];

    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(3); 
    expect(responseData.status).toBe(true);
    
  }, 240000);

  it('should retrieve locus data for an limited user with out locus members even sideLoading=1 :', async () => {
    data.query.pageSize = 1;
    data.user.role = users.normal.role;
    data.query.sideLoading = 1;

    const req = data;
    
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getLocus(req, res);

    const responseData = res.json.mock.calls[0][0];

    expect(responseData.message).toBe('Data retrieved successfully');
    expect(responseData.data).toHaveLength(1); 
    expect(responseData.status).toBe(true);
    expect(responseData.data.LocusMembers).toBeUndefined();

  }, 240000);
});
