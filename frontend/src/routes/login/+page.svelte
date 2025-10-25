<script lang="ts">
    import type { PageData } from "./$types.js";

    export let data: PageData;

    let email = "";
    let password = "";
    let errorMessage = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        errorMessage = "";

        try {
            await data.handleLogin(email, password);
        } catch (error) {
            errorMessage =
                error instanceof Error
                    ? error.message
                    : "Ein Fehler ist aufgetreten";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="container-fluid p-4">
    <div
        class="min-vh-100 d-flex align-items-center justify-content-center row"
    >
        <div class="col-12 w-100" style="max-width: 400px;">
            <div
                class="card border-0 bg-opacity-50 bg-dark"
                style="backdrop-filter: blur(10px);"
            >
                <div class="card-body p-4">
                    <h2 class="card-title text-center h3 mb-3 text-light">
                        Anmelden
                    </h2>
                    <p class="text-center text-muted small mb-4">
                        <a
                            href="/register"
                            class="text-primary text-decoration-none"
                        >
                            Oder registriere dich für einen neuen Account
                        </a>
                    </p>
                    <form on:submit|preventDefault={handleSubmit}>
                        {#if errorMessage}
                            <div class="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        {/if}

                        <div class="mb-3">
                            <label for="email" class="form-label text-light">
                                E-Mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                bind:value={email}
                                class="form-control"
                                style="background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.2);"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label text-light">
                                Passwort
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autocomplete="current-password"
                                required
                                bind:value={password}
                                class="form-control"
                                style="background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.2);"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            class="btn btn-primary w-100"
                        >
                            {#if isLoading}
                                <span
                                    class="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Anmeldung läuft...
                            {:else}
                                Anmelden
                            {/if}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
