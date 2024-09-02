import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addStudentToCourse,
  getCourses,
  getCourse,
  socialActionOnCourse,
} from "../service/courses";

export const useFetchCourses = () => {
  return useQuery("courses", getCourses, {
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};
export const useFetchCourseById = (courseId) => {
  return useQuery(["course", courseId], () => getCourse(courseId), {
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};

export const useSocialActionOnCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(socialActionOnCourse, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("courses");
      queryClient.invalidateQueries(["course", data.course._id]);
    },
    onError: (error) => {
      console.error("Error performing social action on course:", error);
    },
  });
};

export const useAddStudentToCourse = () => {
  const queryClient = useQueryClient();

  return useMutation(addStudentToCourse, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("courses");
      queryClient.invalidateQueries(["course", data.course._id]);
    },
    onError: (error) => {
      console.error("Error adding student to course:", error);
    },
  });
};
