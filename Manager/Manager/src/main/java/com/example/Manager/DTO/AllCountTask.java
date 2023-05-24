package com.example.Manager.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AllCountTask {
    int countAllTask;
    int countAllTaskFail;
    int countAllTaskDoing;
    int countAllTaskWaitting;
    int countAllTaskLate;
    int countAllFinish;


}
