import axios from "axios";
import { JOB_URL } from "../api/endpoints";

const API_URL = JOB_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  jobType: "Full-time" | "Part-time" | "Internship";
  createdAt: string;
  updatedAt: string;
}

export const jobService = {
  // Get all jobs
  getJobs: async (): Promise<Job[]> => {
    const response = await api.get("/");
    return response.data;
  },

  // Create a new job
  createJob: async (
    jobData: Omit<Job, "id" | "createdAt" | "updatedAt">
  ): Promise<Job> => {
    const response = await api.post("/create", jobData);
    return response.data;
  },

  // Update a job
  updateJob: async (id: number, jobData: Partial<Job>): Promise<Job> => {
    const response = await api.put(`/update/${id}`, jobData);
    return response.data;
  },

  // Delete a job
  deleteJob: async (id: number): Promise<void> => {
    await api.delete(`/delete/${id}`);
  },
};
