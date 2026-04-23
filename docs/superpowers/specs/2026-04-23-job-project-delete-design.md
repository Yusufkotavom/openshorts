# Job And Project Delete Design

## Goal

Add delete actions for clip-generator jobs and projects so users can remove history entries and all related data, including active jobs.

## Scope

- Delete a single job.
- Delete all jobs belonging to a project.
- Force-stop active jobs before cleanup.
- Remove persisted artifacts:
  - `output/<job_id>`
  - `job.json`
  - `job.log`
  - generated clips and metadata
  - uploaded source file tied to the job

## Backend

- Track active subprocesses by `job_id`.
- Start each worker in its own process group so delete can kill the whole process tree.
- Persist `project_id` and uploaded input path.
- Add `DELETE /api/jobs/{job_id}` for full cleanup.
- Add `DELETE /api/projects/{project_id}` to delete all matching jobs.

## Frontend

- Keep a current `projectId` in the clip generator workspace.
- Reuse that `projectId` until user clicks `New Project`.
- Send `project_id` on both URL and file submissions.
- Group history by `project_id`.
- Add delete job and delete project actions in History.

## Validation

- Delete completed, queued, and processing jobs.
- Delete a project with mixed job states.
