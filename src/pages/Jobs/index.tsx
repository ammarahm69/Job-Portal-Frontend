import React, { useState } from "react";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import { PiBriefcaseLight } from "react-icons/pi";
import JobModal, { JobFormData } from "../../components/modals/JobModal";
import { jobService } from "../../services/jobService";
import { toast } from "react-hot-toast";

const Job = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateJob = async (jobData: JobFormData) => {
    try {
      setIsLoading(true);
      await jobService.createJob(jobData);
      toast.success("Job created successfully");
      setIsModalOpen(false);
    } catch (error: unknown) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          endIcon={<PiBriefcaseLight size={20} />}
          onClick={() => setIsModalOpen(true)}
        >
          Create A Job
        </Button>
      </div>

      <BasicTableOne />

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJob}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Job;
