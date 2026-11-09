
from django.shortcuts import render, redirect, get_object_or_404
from .models import Task


def todo_list(request):
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        description = request.POST.get("description", "").strip()

        if title:
            Task.objects.create(
                title=title,
                description=description
            )

        return redirect("todo_list")

    tasks = Task.objects.all().order_by("-created_at")

    return render(
        request,
        "messageapp/todo_list.html",
        {"tasks": tasks}
    )


def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        description = request.POST.get("description", "").strip()

        if title:
            task.title = title
            task.description = description
            task.save()
            return redirect("todo_list")

    return render(
        request,
        "messageapp/edit_task.html",
        {"task": task}
    )


def complete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == "POST":
        task.completed = not task.completed
        task.save()

    return redirect("todo_list")


def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == "POST":
        task.delete()

    return redirect("todo_list")
