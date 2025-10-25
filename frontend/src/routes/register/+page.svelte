<script lang="ts">
    import type { PageData } from "./$types.js";

    export let data: PageData;

    let name = "";
    let email = "";
    let password = "";
    let passwordConfirmation = "";
    let errorMessage = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        errorMessage = "";

        try {
            await data.handleRegister(name, email, password, passwordConfirmation);
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

<div class="min-vh-100 d-flex align-items-center justify-content-center">
    <div class="w-100" style="max-width: 400px;">
        <div class="card bg-dark text-white border-secondary">
            <div class="card-body p-4">
                <h2 class="card-title text-center h3 mb-3">
                    Registrieren
                </h2>
                <p class="text-center text-muted small mb-4">
                    Oder
                    <a href="/login" class="text-primary text-decoration-none">
                        melde dich mit deinem bestehenden Account an
                    </a>
                </p>
                <form on:submit|preventDefault={handleSubmit}>
                    {#if errorMessage}
                        <div class="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    {/if}

                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            bind:value={name}
                            class="form-control bg-dark text-white border-secondary"
                            placeholder="Max Mustermann"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">E-Mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            bind:value={email}
                            class="form-control bg-dark text-white border-secondary"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Passwort</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            bind:value={password}
                            class="form-control bg-dark text-white border-secondary"
                            placeholder="••••••••"
                            minlength="8"
                        />
                    </div>

                    <div class="mb-3">
                        <label for="password_confirmation" class="form-label">Passwort bestätigen</label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            bind:value={passwordConfirmation}
                            class="form-control bg-dark text-white border-secondary"
                            placeholder="••••••••"
                            minlength="8"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        class="btn btn-primary w-100"
                    >
                        {#if isLoading}
                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Registrierung läuft...
                        {:else}
                            Registrieren
                        {/if}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
