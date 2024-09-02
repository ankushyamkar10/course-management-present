import axiosnew from "../axios";

export const getCourses = async () => {
  const response = await axiosnew.get("/api/courses");
  return response.data;
};

export const getCourse = async (courseId) => {
  const response = await axiosnew.get("/api/courses/" + courseId);
  return response.data;
};

export const socialActionOnCourse = async ({ courseId, studentId, like }) => {
  const endpoint = like
    ? `/api/courses/${courseId}/like`
    : `/api/courses/${courseId}/dislike`;

  const response = await axiosnew.patch(endpoint, { studentId });

  return response.data;
};

export const addStudentToCourse = async ({ courseId, studentId }) => {
  const response = await axiosnew.patch(
    `/api/courses/${courseId}/add-student`,
    { _id: studentId }
  );
  return response.data;
};
