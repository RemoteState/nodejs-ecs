import request from 'supertest';
import { app } from '../../server';

describe('GET /health - a simple api endpoint', () => {
    it('Health API Request', async () => {
        const result = await request(app).get('/api/v1/health');
        expect(result.statusCode).toEqual(200);
        expect(result.body.status).toBe('okay');
    });
});
